import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { IGenericMessage } from '..';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(email: string, password: string): Observable<IGenericMessage> {
    return this.http
      .post<IGenericMessage>(`${environment.serverUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(catchError((error) => throwError(() => error)));
  }

  register(email: string, password: string): Observable<IGenericMessage> {
    return this.http
      .post<IGenericMessage>(`${environment.serverUrl}/auth/register`, {
        email,
        password,
      })
      .pipe(catchError((error) => throwError(() => error)));
  }
}
