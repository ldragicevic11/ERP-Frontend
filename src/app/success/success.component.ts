import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { StripeService } from 'ngx-stripe';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  orderId: any;

  constructor(
    private navigationService: NavigationService,
    private utilityService: UtilityService,
  ) {}
  ngOnInit(): void {
    let userId = this.utilityService.getUser().userId;
    this.navigationService.confirmPayment(userId).subscribe({
      next: (data: any) => {
        this.orderId = data.orderId;
        this.utilityService.clearCart();
      }
    })
  }

}
