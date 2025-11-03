import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { ICharacter } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private http = inject(HttpClient);

  private getAuthHeaders(): HttpHeaders {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user?.token;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getFavorites(): Observable<{ favorites: ICharacter[] }> {
    return this.http
      .get<{ favorites: ICharacter[] }>(`${environment.serverUrl}/favorites`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError((error) => throwError(() => error)));
  }

  toggleFavorite(
    character: ICharacter
  ): Observable<{ action: string; favorite?: ICharacter }> {
    return this.http
      .put<{ action: string; favorite?: ICharacter }>(
        `${environment.serverUrl}/favorites`,
        character,
        { headers: this.getAuthHeaders() }
      )
      .pipe(catchError((error) => throwError(() => error)));
  }
}
