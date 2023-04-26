import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private http: HttpClient, private router: Router) {}

  // Object to get data from the input
  public data = {
    name: '',
    email: '',
    password: '',
    age: '',
  };

  // sign up handler function
  onSignUp = () => {
    console.log(this.data);
    this.http
      .post(`${environment.apiBaseUrl}auth/register`, this.data)
      .subscribe((data: any) => {
        if (data.success) {
          this.router.navigate(['/']);
        }
      });
  };
}
