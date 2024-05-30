import { Component, ElementRef, ViewChild} from '@angular/core';
import { switchMap } from 'rxjs';
import { StripeService } from 'ngx-stripe';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  constructor(
    private navigationService: NavigationService,
    private utilityService: UtilityService,
    private stripeService: StripeService
  ) {}

  checkout() {
    let userId = this.utilityService.getUser().userId;
    this.navigationService.createPaymentSession(userId)
      .pipe(
        switchMap((session: any) => {
          return this.stripeService.redirectToCheckout({ sessionId: session.sessionId })
        })
      )
      .subscribe(result => {
        if (result.error) {
          alert(result.error.message);
        }
      });
  }

}
