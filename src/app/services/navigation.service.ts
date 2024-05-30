import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, Product, ProductDTO, User } from '../models/models';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  
  baseurl = "https://localhost:7252/api/";
  token!: string;


  constructor(private http: HttpClient) { }

  getHeaders() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return headers;
  }

  setToken(token: string) {
    this.token = token;
  }



  getProducts(count: number) {
    return this.http.get<ProductDTO[]>(this.baseurl + 'Product', {
      params: new HttpParams().set('count', count.toString()),
    });
  }
  
  
  getProduct(id: number): Observable<Product> {
    let url = this.baseurl + 'Product/' + id;
    return this.http.get<Product>(url);
  } 
  

  registerUser(user: User) {
    let url = this.baseurl + 'User/register';
    return this.http.post(url, user, { responseType: 'text' });
  }

  loginUser(email: string, password: string) {
    let url = this.baseurl + 'Auth/login';
    return this.http.post(
      url,
      { Username: email, Password: password },
      { responseType: 'text' }
    );
  }

  submitReview(userid: number, productid: number, review: string) {
    let obj: any = {
      
      userId: userid,
      
      productId: productid,
      
      Comment: review,
      
    };

    let url = this.baseurl + 'Review';
    return this.http.post(url, obj, { responseType: 'text' });
  }

  getAllReviewsOfProduct(productId: number) {
    let url = this.baseurl + 'Review/' + productId;
    return this.http.get(url);
  }

  addToCart(userid: number, productid: number) {
    let url = this.baseurl + 'CartItem';
    return this.http.post(url, {
      userId: userid,
      productId: productid,
      quantity: 1
    }, { responseType: 'text' });
  }

  getActiveCartOfUser(userid: number) {
    let url = this.baseurl + 'Cart/users/' + userid;
    return this.http.get(url);
  }

  getAllPreviousCarts(userid: number) {
    let url = this.baseurl + 'CartManager/previous-carts/' + userid;
    return this.http.get(url);
  }

  
  removeFromCart(userId: number, productId: number) {
    let url = this.baseurl + 'CartManager/remove-item?userId=' + userId + '&productId=' + productId;
    return this.http.delete(url, { responseType: 'text' });
  }

  addProduct(product: Product) {
    let url = this.baseurl + 'Product';
    return this.http.post(url, product, { responseType: 'text' });
  }

  getUsers() {
    return this.http.get<User[]>(this.baseurl + 'User', {
    });
  }

  deleteUser(userId: number): Observable<any> {
    let url = this.baseurl + 'User/' + userId;
    return this.http.delete(url);
  }

  updateUser(userId: number, user: User): Observable<any> {
    let url = this.baseurl + 'User/UpdateUser/' + userId;
    return this.http.put(url, user);
  }

  updateProduct(productId: number, product: Product): Observable<any> {
    let url = this.baseurl + 'Product/' + productId;
    return this.http.put(url, product);
  }
  
  deleteCart(cartId: number) {
    let url = this.baseurl + 'Cart/' + cartId;
    return this.http.delete(url, { responseType: 'text' });
  }

  createOrder(order: Order): Observable<any> {
    let url = this.baseurl + 'Order';
    return this.http.post(url, order);
  }

  createPaymentSession(userId: any): Observable<any> {
    let url = this.baseurl + 'Stripe/create-checkout-session';
    return this.http.post(url, {userId});
  }

  confirmPayment(userId: number) {
    let url = this.baseurl + 'Stripe/confirm-order';
    return this.http.post(url, {userId});
  }
  
}
