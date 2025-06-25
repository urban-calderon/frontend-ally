import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { TaskResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly baseUrl: string = environment.API_URL_BACKEND;
  private http                     = inject(HttpClient);
  private authService              = inject(AuthService);

  constructor() { }

  getTasks(): Observable<TaskResponse> {
    const url = `${this.baseUrl}/api/tasks`;

    try {
      const headers = this.authService.getAuthHeaders();
      return this.http.get<TaskResponse>(url, { headers }).pipe(
        catchError(error => {
          if (error.status === 401) {
            this.authService.logout();
          }
          return throwError(() => error.error.message || 'Error al obtener las tareas');
        })
      );
    } catch (error) {
      this.authService.logout();
      return throwError(() => 'Sesión expirada, por favor vuelve a iniciar sesión');
    }
  }
}
