import { Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[OpenProducts]'
})
export class OpenProductsDirective {

  @HostListener('click') openProducts() {
    this.router.navigate(['/products'], {
      queryParams: {     
      },
    });
  }

  constructor(private router: Router) { }

}
