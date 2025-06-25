import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, tap, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment.development';
import { AuthStatus, User, Data, LoginResponse } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.API_URL_BACKEND;
  private http = inject( HttpClient);

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed( () => this._currentUser());
  public authStatus = computed( () => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  login( email:string, password: string): Observable<boolean> {

    const url = `${ this.baseUrl }/api/users/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        tap( (response: LoginResponse) => {
          const data = response.data as Data;
          this._currentUser.set(data.user);
          this._authStatus.set( AuthStatus.authenticated);
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(data.user));
          console.log(data)
        }),

        map( () => true),
        catchError(err => throwError(() => err.error.message || 'Error en el servidor'))
      );

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );
  }

  checkAuthStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      this.logout();
      return of(false);
    }

    this._currentUser.set(JSON.parse(user));
    this._authStatus.set( AuthStatus.authenticated);
    return of(true);

  }

  get token(): string | null {
    return localStorage.getItem('token')
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.token;
    if (!token) {
      throw new Error('No authentication token available');
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
