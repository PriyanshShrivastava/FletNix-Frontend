import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  // login handler function
  submitForm = (event: Event): void => {
    event.preventDefault();
    if (this.myForm.valid) {
      // populating email and password value
      const data = {
        email: this.myForm.controls['email'].value,
        password: this.myForm.controls['password'].value,
      };

      // subscribing to authservice login
      this.authService.login(data.email, data.password).subscribe(
        (response) => {
          localStorage.setItem('auth', JSON.stringify(response));
          this.toastr.success('Loggin In');
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);
        },
        (error) => {
          this.toastr.error('Opss! Wrong Credentials');
          this.myForm.reset();
        }
      );
    } else {
      this.toastr.error('Opss! Wrong Credentials');
      setTimeout(() => {
        this.myForm.reset();
      }, 1000);
    }
  };
}
