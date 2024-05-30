import { Component, Input, OnInit } from '@angular/core';
import { Product, ProductDTO } from '../models/models';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  @Input() view: 'grid' | 'list' | 'currentcartitem' | 'prevcartitem' = 'grid';
  @Input() product: ProductDTO  = {
    productId: 0,
    name: '',
    model: '',
    description: '',
    price: 0,  
    discount: 0,
    onStock: 0,
  };

  
  constructor(public utilityService: UtilityService) {}

  ngOnInit(): void {
    // console.log('ID:', this.product.productId);
    // console.log('Name:', this.product.name);
    // console.log('Model:', this.product.model);
    // console.log('Description:', this.product.description);
    // console.log('Price:', this.product.price);
    // console.log('Discount:', this.product.discount);
    // console.log('On Stock:', this.product.onStock);
  }

  addToCart(product:any) {
    this.utilityService.addToCart(product)
  }
}
