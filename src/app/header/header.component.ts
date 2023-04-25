import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public userName: string | null = '';
  constructor(private authService: AuthService, private router: Router) {
    const authJson = localStorage.getItem('auth');
    const auth = authJson ? JSON.parse(authJson) : null;
    this.userName = auth?.user?.name;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
