import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private navigationService: NavigationService, 
    private router: Router,
    private utilityService: UtilityService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.utilityService.isLoggedIn()) {
      // Korisnik je ulogovan
      // Provera uloge korisnika
      if (this.utilityService.isAdmin()) {
        // Ulogovan je admin korisnik, zabrani pristup putanjama /cart i /orders
        if (state.url.includes('/cart') || state.url.includes('/orders')) {
          this.router.navigate(['/home']); // Preusmerite na drugu putanju
          return false;
        } else {
          return true; // Dozvoli pristup ostalim putanjama
        }
      } else {
        // Ulogovan je običan korisnik, zabrani pristup putanji /account
        if (state.url.includes('/account')) {
          this.router.navigate(['/home']); // Preusmerite na drugu putanju
          return false;
        } else {
          return true; // Dozvoli pristup ostalim putanjama
        }
      }
    } else {
      // Korisnik nije ulogovan, preusmerite ga na home
      this.router.navigate(['/home']);
      return false;
    }
  }
}
