import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/models';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  message = '';


  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z].*'),
        ],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z].*'),
          
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      contact: ['', Validators.required],
      city: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
      userTypeId: ['2'],
    });
  }

  register() {
    const user: User = {
      userId: 0,
      name: this.Name.value,
      userName: this.Username.value,
      email: this.Email.value,
      address: this.Address.value,
      contact: this.Contact.value,
      password: this.Password.value,
      city: this.City.value,
      userTypeId: 2,
    };

    this.navigationService.registerUser(user).subscribe(
      (res: any) => {
        this.message = res.toString();
      },
      (error) => {
        console.log(error);
        // Dodatna obrada greške
      }
    );
  }

  //#region Getters
  get Name(): FormControl {
    return this.registerForm.get('name') as FormControl;
  }
  get Username(): FormControl {
    return this.registerForm.get('username') as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get Address(): FormControl {
    return this.registerForm.get('address') as FormControl;
  }
  get Contact(): FormControl {
    return this.registerForm.get('contact') as FormControl;
  }
  get City(): FormControl {
    return this.registerForm.get('city') as FormControl;
  }
  get Password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get UserTypeId(): FormControl {
    return this.registerForm.get('userTypeId') as FormControl;
  }
  //#endregion
}
