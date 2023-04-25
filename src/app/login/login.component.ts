import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}
  public data = {
    email: '',
    password: '',
  };

  onLogin = () => {
    this.authService.login(this.data.email, this.data.password).subscribe(
      (response) => {
        localStorage.setItem('auth', JSON.stringify(response));
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error);
      }
    );
  };
}
