import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string }> {
    const credentials = { email: email, password: password };
    return this.http
      .post<{ token: string }>(
        `${environment.apiBaseUrl}auth/login`,
        credentials
      )
      .pipe(
        tap(() => {
          this.loggedIn = true;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('auth');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('auth');
    return !!token; // Returns true if token is not null or undefined
  }
}
