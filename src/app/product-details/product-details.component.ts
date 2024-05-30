import { Component, OnInit } from '@angular/core';
import { Product, ProductDTO, Review } from '../models/models';
import { UtilityService } from '../services/utility.service';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  imageIndex: number = 1;
  product: ProductDTO = {
    description: '',
    discount: 0,
    model: '',
    name: '',
    onStock: 0,
    price:0,
    productId: 0
  };
  reviewControl = new FormControl('');
  showError: boolean = false;
  reviewSaved: boolean = false;
  otherReviews: Review[] = [];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    public utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let id = params.id;
      this.navigationService.getProduct(id).subscribe((res: any) => {
        this.product = res;
        this.fetchAllReviews();
      });
    });
  }

  submitReview() {
    let review = this.reviewControl.value;

    if (review === '' || review === null) {
      this.showError = true;
      return;
    }
    
    this.showError = false;

    let userid = this.utilityService.getUser().userId;
    let productid = this.product.productId; 

    

    this.navigationService
      .submitReview(userid, productid, review)
      .subscribe((res) => {
        console.log(res);
        this.fetchAllReviews();
        this.reviewControl.setValue('');
      });

      
  }

  fetchAllReviews() {
    this.otherReviews = []; // Očisti listu pre dodavanja novih recenzija
    this.navigationService.getAllReviewsOfProduct(this.product.productId)
      .subscribe((res: any) => {
        console.log(res); // Dodajte ovu liniju da biste videli odgovor
        if (Array.isArray(res)) {
          // Ako je res niz, iteriramo kroz njega i dodajemo recenzije u otherReviews
          for (let review of res) {
            this.otherReviews.push(review);
          }
        } else {
          // Ako res nije niz, direktno dodajemo recenziju u otherReviews
          this.otherReviews.push(res);
        }
      });
  }
  

  
  addToCart(product:any) {
    this.utilityService.addToCart(product)
  }
}
