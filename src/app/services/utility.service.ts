import { Injectable } from '@angular/core';
import { Cart, LoggedUser, Order, Payment, ProductDTO, User } from '../models/models';
import { NavigationService } from './navigation.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  changeCart = new Subject();

  constructor(
    private navigationService: NavigationService,
    private jwt: JwtHelperService
  ) { }

  applyDiscount(price: number, discount: number): number {
    let finalPrice: number = price - price * (discount / 100);
    return finalPrice;
  }

  getUser(): User {
    const rawToken: string = localStorage.getItem('user')!;
    let token = this.jwt.decodeToken(rawToken);
    
    let user: User = {
      userId: token.user_id,
      email: token.email,
      name: token.name,
      address: token.address,
      contact: token.contact,
      userName: token.username,
      city: token.city,
      password: '',
      userTypeId: token.usertype_id,
    };
  
    return user;
  }

  setUser(token: string) {
    localStorage.setItem('user', token);
  }

  isLoggedIn() {
    return localStorage.getItem('user') ? true : false;
  }

  logoutUser() {
    localStorage.removeItem('user');
  }

  isAdmin(): boolean {
    let user = this.getUser();
    return user && user.userTypeId == 1;
  }

  

  addToCart(product: ProductDTO) {
    let productid = product.productId;
    let userid = this.getUser().userId;
    this.navigationService.addToCart(userid, productid).subscribe((res) => {
       this.changeCart.next(1);
    }, err => {
      alert("Proizvod nije dosutpan")
    });
    
  }

  removeFromCart(product: ProductDTO) {
    let productId = product.productId;
    let userId = this.getUser().userId;
  
      this.navigationService.removeFromCart(userId, productId).subscribe((res) => {
        this.changeCart.next(-1);
      });
    
  }

  clearCart() {
    this.changeCart.next(0);
  }
  

  getCartItemIdByProductId(productId: number): Observable<number | null> {
    const userId = this.getUser().userId;
    return this.navigationService.getActiveCartOfUser(userId).pipe(
      map((cart: any) => {
        const cartItem = cart.cartItems.find((item: any) => item.product.productId === productId);
        return cartItem ? cartItem.id : null;
      })
    );
  }
  





  calculatePayment(cart: Cart, payment: Payment) {
    payment.totalAmount = 0;
    payment.amountPaid = 0;
    payment.amountReduced = 0;

    for (let cartitem of cart.cartItems) {
      payment.totalAmount += cartitem.product.price;

      payment.amountReduced +=
        cartitem.product.price -
        this.applyDiscount(
          cartitem.product.price,
          cartitem.product.discount ?? 0
        );

      payment.amountPaid += this.applyDiscount(
        cartitem.product.price,
        cartitem.product.discount ?? 0
      );
    }

    if (payment.amountPaid > 50000) payment.shipingCharges = 2000;
    else if (payment.amountPaid > 20000) payment.shipingCharges = 1000;
    else if (payment.amountPaid > 5000) payment.shipingCharges = 500;
    else payment.shipingCharges = 200;

    payment.amountPaid = payment.amountPaid + payment.shipingCharges;
  }

  calculatePricePaid(cart: Cart) {
    let pricepaid = 0;
    for (let cartitem of cart.cartItems) {
      pricepaid += this.applyDiscount(
        cartitem.product.price,
        cartitem.product.discount
      );
    }
    return pricepaid;
  }

  deleteCart(cartId: number): Observable<any> {
    return this.navigationService.deleteCart(cartId);
  }
  

  createOrder(order: Order): Observable<any> {
    return this.navigationService.createOrder(order);
  }
  
  
}
