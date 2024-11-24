import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/service/registration.service';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';

@Component({
  selector: 'app-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['Customer', Validators.required],
      customerCategory: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      emailId: ['', [Validators.required, Validators.email]],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zipCode: ['', Validators.required],
      dob: ['', Validators.required],
    });
  }

  get form() {
    return this.registrationForm.controls;
  }

  async onSubmit(): Promise<void> {
      this.isSubmitted = true;
      if (this.registrationForm.invalid) {
        return;
      }
      const customerData = new Customer(
        undefined,
        this.form['userName'].value,
        this.form['password'].value,
        this.form['role'].value,
        this.form['customerCategory'].value,
        this.form['phone'].value,
        this.form['emailId'].value,
        this.form['address1'].value,
        this.form['address2'].value,
        this.form['city'].value,
        this.form['state'].value,
        this.form['country'].value,
        this.form['zipCode'].value,
        this.form['dob'].value
      );
      if (!customerData.password) {
        console.error('Password is required');
        return; 
      }
      this.registrationService.registerCustomer(customerData).subscribe(
        (response) => {
          console.log('Customer registered successfully', response);
          this.router.navigate(['/customer-login']);
        },
        (error) => {
          console.error('Error registering customer', error);
        }
      );
  }
}
