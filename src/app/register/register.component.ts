import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  myForm!: FormGroup;
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // Initialising form validation
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  // sign up handler function
  submitForm = (event: Event): void => {
    event.preventDefault();
    if (this.myForm.valid) {
      // constructing an object
      const data = {
        name: this.myForm.controls['name'].value,
        email: this.myForm.controls['email'].value,
        password: this.myForm.controls['password'].value,
        age: this.myForm.controls['age'].value,
      };

      this.http.post(`${environment.apiBaseUrl}auth/register`, data).subscribe(
        (data: any) => {
          if (data.success) {
            this.toastr.success('Account Created Succesfully ');
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1000);
          } else {
            this.toastr.error(
              'Error creating account. Please try again later.'
            );
          }
        },
        (error) => {
          // If there's an error with the API call, show an error message
          this.toastr.error('Error creating account. Please try again later.');
        }
      );
    } else {
      // If the form is not valid, show an error message
      this.toastr.error('Please fill the form correctly.');

      setTimeout(() => {
        this.myForm.reset();
      }, 1000);
    }
  };
}
