import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { NavigationService } from '../services/navigation.service';
import { Cart, Payment, Order } from '../models/models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  usersCart: Cart = {
    id: 0,
    user: this.utilityService.getUser(),
    cartItems: [],
    isActive: true,
  };

  usersPaymentInfo: Payment = {
    PaymentId: 0,
    user: this.utilityService.getUser(),
    paymentMethod: 'Credit card',
    totalAmount: 0,
    shipingCharges: 0,
    amountReduced: 0,
    amountPaid: 0,
  };

  usersPreviousCarts: Cart[] = [];

  constructor(
    public utilityService: UtilityService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.loadCartData();
  }

  loadCartData() {
    // Get Cart
    this.navigationService.getActiveCartOfUser(this.utilityService.getUser().userId).subscribe((res: any) => {
      this.usersCart = {
        ...res,
        id: res.cartId
      };
      
      // Calculate Payment
      this.utilityService.calculatePayment(this.usersCart, this.usersPaymentInfo);
    });

    // Get Previous Carts
    // this.navigationService.getAllPreviousCarts(this.utilityService.getUser().userId).subscribe((res: any) => {
    //   this.usersPreviousCarts = res;
    // });
  }

  deleteCart(cartId: number) {
    this.utilityService.deleteCart(cartId).subscribe(() => {
      // Reload cart data after successful deletion
      this.utilityService.clearCart();
      this.loadCartData();
    });
  }

  placeOrder() {
    const order: Order = {
      OrderId: 0,  // Dodato polje 'OrderId'
      cart: this.usersCart,
      user: this.utilityService.getUser(),
      payment: this.usersPaymentInfo,
    };

    // Call the service method to create the order
    // w
  }
}
