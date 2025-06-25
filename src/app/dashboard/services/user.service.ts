import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User, UsersResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl: string = environment.API_URL_BACKEND;
  private http                     = inject(HttpClient);
  private authService              = inject(AuthService);

  constructor() { }

  getUsers(): Observable<UsersResponse> {
    const url = `${this.baseUrl}/api/users`;

    try {
      const headers = this.authService.getAuthHeaders();
      return this.http.get<UsersResponse>(url, { headers }).pipe(
        catchError(error => {
          if (error.status === 401) {
            this.authService.logout();
          }
          return throwError(() => error.error.message || 'Error al obtener los usuarios');
        })
      );
    } catch (error) {
      this.authService.logout();
      return throwError(() => 'Sesión expirada, por favor vuelve a iniciar sesión');
    }
  }
}
