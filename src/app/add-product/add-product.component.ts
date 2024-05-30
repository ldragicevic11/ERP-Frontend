import { Component, ElementRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { ProductsComponent } from '../products/products.component';
import { Product } from '../models/models';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  productForm!: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService,
  ) {}
  ngOnInit(): void {

    this.productForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z].*'),
        ],
      ],
      model: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z].*'),
          
        ],
      ],
      price: ['', [Validators.required, Validators.min(0)]],
      onStock: ['', [Validators.required, Validators.min(0)]],
      guarantee: ['', [Validators.required]],
    });

  }




  addProduct() {
    const product: Product = {
      productID: 0,
      name: this.Name.value,
      model: this.Model.value,
      price: this.Price.value,
      discount: 0,
      description: '',
      onStock: this.OnStock.value,
      guarantee: this.Guarantee.value.toString(),
    };

    this.navigationService.addProduct(product).subscribe(
      (res: any) => {
        this.message = 'Successfully saved';
      },
      (error) => {
        console.log(error);
        // Dodatna obrada greške
      }
    );
  }


  get Name(): FormControl {
    return this.productForm.get('name') as FormControl;
  }
  get Model(): FormControl {
    return this.productForm.get('model') as FormControl;
  }
  get Price(): FormControl {
    return this.productForm.get('price') as FormControl;
  }
  
  get OnStock(): FormControl {
    return this.productForm.get('onStock') as FormControl;
  }
  get Guarantee(): FormControl {
    return this.productForm.get('guarantee') as FormControl;
  }
  
}
