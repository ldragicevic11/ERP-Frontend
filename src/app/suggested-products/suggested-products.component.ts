import { Component, Input, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { Product, ProductDTO } from '../models/models';

@Component({
  selector: 'app-suggested-products',
  templateUrl: './suggested-products.component.html',
  styleUrls: ['./suggested-products.component.css']
})
export class SuggestedProductsComponent implements OnInit {
  @Input() count: number = 3;
  // @Input() search: string = '';
  products: ProductDTO[] = [];

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
      this.navigationService
        .getProducts(this.count)
        .subscribe((res: any[]) => {
          for (let product of res) {
            this.products.push(product);
          }
        });
    
  }
}
