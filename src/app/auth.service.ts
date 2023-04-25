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
  public user: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    const authJson = localStorage.getItem('auth');
    const auth = authJson ? JSON.parse(authJson) : null;

    if (auth) {
      this.user.next(auth.user);
      console.log(auth.user);
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
