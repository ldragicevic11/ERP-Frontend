import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './guards/auth.guard';
import { SuccessComponent } from './success/success.component';
// import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'products', component: ProductsComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  { path: 'orders', component: OrderComponent, canActivate: [AuthGuard]},
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
