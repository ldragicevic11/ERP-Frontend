import { Component, ElementRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { Product, ProductDTO } from '../models/models';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  view: 'grid' | 'list' = 'list';
  sortby: 'default' | 'htl' | 'lth' = 'default';
  products: ProductDTO[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages!: number;
  itemsPerPage: number = 4;

  productForm!: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    public utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.navigationService.getProducts(10).subscribe((res: ProductDTO[]) => {
        this.products = res;
        this.sortByPrice(this.sortby);
        this.calculateTotalPages();
      });
    });
  }

  sortByPrice(sortKey: string) {
    this.products.sort((a, b) => {
      if (sortKey === 'default') {
        return a.productId > b.productId ? 1 : -1;
      }
      
      const priceA = a.price;
      const priceB = b.price;
  
      return (
        (sortKey === 'htl' ? 1 : -1) *
        (priceA > priceB ? -1 : 1)
      );
    });
  }
  

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  
}
