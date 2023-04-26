import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  theme: string | null = localStorage.getItem('theme'); // getting theme valur from localStorage
  darkTheme: boolean = false;
  public userName: string | null = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'light');
    }

    // checking the authservice user for getting the username from localStorage
    this.authService.user.subscribe((user: any) => {
      this.userName = user?.name.split(' ')[0];
    });
  }

  // a function to toggle theme
  toggleTheme() {
    this.darkTheme = !this.darkTheme;
    if (this.darkTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      this.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      this.theme = 'light';
    }
  }

  // returning whether a user is logged in or not
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  //  redirecting and callig logout
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
