import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { Product } from '../models/models';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  editProductForm!: FormGroup;
  productId!: any
  message = '';
  product: Product = {
    name: '',
    description: '',
    discount: 0,
    guarantee: '',
    model: '',
    onStock: 0,
    price: 0,
    productID: 0
  };
  formChanges = false;


  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
  ) {
   
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let id = params.id;
      this.productId = id;
      this.navigationService.getProduct(id).subscribe((res: any) => {
        this.product = res;

        this.editProductForm.patchValue({
          name: res.name,
          model: res.model,
          price: res.price,
          onStock: res.onStock,
          guarantee: res.guarantee,
        });
      });
    });

    this.editProductForm = this.fb.group({
      name: [
        this.product?.name || '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z].*'),
        ],
      ],
      model: [
        this.product?.model || '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z].*'),
        ],
      ],
      price: [this.product?.price || '', [Validators.required, Validators.min(0)]],
      discount: [
        this.product?.discount || '',
        [Validators.required, Validators.min(0), Validators.max(60)],
      ],
      onStock: [this.product?.onStock || '', [Validators.required, Validators.min(0)]],
      guarantee: [this.product?.guarantee || '2 years'],
    });

   
  
    this.editProductForm.valueChanges.subscribe(() => {
      this.formChanges = true;
    }); 
  }

  ngOnInit(): void {
    
    
  }
  
  

  updateProduct() {
    const product: Product = {
      productID: this.product.productID,
      name: this.Name.value,
      model: this.Model.value,
      price: this.Price.value,
      discount: this.Discount.value,
      description: '',
      onStock: this.OnStock.value,
      guarantee: this.Guarantee.value.toString(),
    };

    this.navigationService.updateProduct(this.productId, product).subscribe(
      (res: any) => {
        this.message = 'Successfully updated';
      },
      (error) => {
        console.log(error);
        // Dodatna obrada greške
      }
    );
  }

  // Getteri za pojedinačne kontrole forme

  get Name(): FormControl {
    return this.editProductForm.get('name') as FormControl;
  }

  get Model(): FormControl {
    return this.editProductForm.get('model') as FormControl;
  }

  get Price(): FormControl {
    return this.editProductForm.get('price') as FormControl;
  }

  get Discount(): FormControl {
    return this.editProductForm.get('discount') as FormControl;
  }

  get OnStock(): FormControl {
    return this.editProductForm.get('onStock') as FormControl;
  }

  get Guarantee(): FormControl {
    return this.editProductForm.get('guarantee') as FormControl;
  }
}

