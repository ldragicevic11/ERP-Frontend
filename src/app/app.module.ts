import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { SuggestedProductsComponent } from './suggested-products/suggested-products.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { OpenProductDetailsDirective } from './directives/open-product-details.directive';
import { OpenProductsDirective } from './directives/open-products.directive';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AddProductComponent } from './add-product/add-product.component';
import { AccountComponent } from './account/account.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { UpdateProductComponent } from './update-product/update-product.component';
import { PaymentComponent } from './payment/payment.component';
import { NgxStripeModule } from 'ngx-stripe';
import { SuccessComponent } from './success/success.component';

// import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    SuggestedProductsComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CartComponent,
    OrderComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    OpenProductDetailsDirective,
    OpenProductsDirective,
    LoginComponent,
    RegisterComponent,
    AddProductComponent,
    AccountComponent,
    UpdateProductComponent,
    PaymentComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule, 
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    NgxStripeModule.forRoot("pk_test_51NB50cFwFW4jFuKbLHtBYEU0GOI6c5WWCDeARNPCcpNLfBcrkhaqwFxNlNyelv7FkIxBUMZa1L7zwDiAjihmbFWN00vLpu9pTq"),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('user');
        },
        allowedDomains: ['localhost:7252'],
      },
    }),
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: () => {
    //       return localStorage.getItem('token');
    //     },
    //     allowedDomains: ['localhost:7252'], // moj domen
    //     disallowedRoutes: ['localhost:7252/api/auth'], //  putanja za prijavljivanje
    //   }
    // })
  ],
  providers: [
    JwtHelperService,
    // AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
