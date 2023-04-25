import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: boolean = false;
  public user: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private router: Router) {
    const authJson = localStorage.getItem('auth');
    const auth = authJson ? JSON.parse(authJson) : null;

    if (auth) {
      this.user.next(auth.user);
      if (this.router.url === '/register') {
        this.router.navigate(['/home']);
      } else if (this.router.url === '/home') {
      }
    }

    const theme: string | null = localStorage.getItem('theme');
    if (theme) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  login(
    email: string,
    password: string
  ): Observable<{ token: string; user: any }> {
    const credentials = { email: email, password: password };
    return this.http
      .post<{ token: string; user: any }>(
        `${environment.apiBaseUrl}auth/login`,
        credentials
      )
      .pipe(
        tap((response) => {
          this.loggedIn = true;
          localStorage.setItem('auth', JSON.stringify(response));
          this.user.next(response.user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.user.next(null);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('auth');
    return !!token; // Returns true if token is not null or undefined
  }
}
