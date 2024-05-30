import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { Cart, Payment } from '../models/models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  selectedPaymentMethodName = 'Credit card';
  selectedPaymentMethod = new FormControl('0')



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

  
constructor(
  private navigationService: NavigationService,
  public utilityService: UtilityService
) {}

  ngOnInit(): void {
      this.selectedPaymentMethod.valueChanges.subscribe((res: any) => {
      if (res === '0') this.selectedPaymentMethodName = '';
      else this.selectedPaymentMethodName = res.toString();
    });


    //get cart
    this.navigationService
      .getActiveCartOfUser(this.utilityService.getUser().userId)
      .subscribe((res: any) => {
        this.usersCart = res;
        this.utilityService.calculatePayment(
          res,
          this.usersPaymentInfo
        );
      });

    
      
  }
}
