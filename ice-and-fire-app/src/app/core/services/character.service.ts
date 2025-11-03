import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICharacter } from '..';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private http = inject(HttpClient);

  getCharactersList(
    page: number = 1,
    pageSize: number = 50,
    name?: string
  ): Observable<ICharacter[]> {
    let url = `${environment.serviceUrl}characters`;
    if (name?.trim()) {
      // When searching by name, don't include pagination
      url += `?name=${encodeURIComponent(name.trim())}`;
    } else {
      // Only use pagination when not searching
      url += `?page=${page}&pageSize=${pageSize}`;
    }
    return this.http.get<ICharacter[]>(url).pipe(
      map((characters) =>
        characters
          .filter(({ name }) => name?.trim())
          .map((character) => ({
            ...character,
            url: character.url.replace(environment.serviceUrl, ''),
          }))
      ),
      catchError((error) => throwError(() => error))
    );
  }

  getCharacterInfo(id: string): Observable<ICharacter> {
    return this.http
      .get<ICharacter>(`${environment.serviceUrl}characters/${id}`)
      .pipe(catchError((error) => throwError(() => error)));
  }
}
