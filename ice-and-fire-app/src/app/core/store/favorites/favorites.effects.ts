import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { FavoriteService } from '../../services';
import { ToastService } from '../../services/toast.service';
import * as FavoritesActions from './favorites.actions';
import { ICharacter } from '../../models';

@Injectable()
export class FavoritesEffects {
  private actions$ = inject(Actions);
  private favoritesService = inject(FavoriteService);
  private toastService = inject(ToastService);

  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.loadFavorites),
      switchMap(() =>
        this.favoritesService.getFavorites().pipe(
          map((response) =>
            FavoritesActions.loadFavoritesSuccess({
              favorites: response.favorites,
            })
          ),
          catchError((error) => {
            this.toastService.showError(
              error.error?.message || 'Failed to load favorites'
            );
            return of(
              FavoritesActions.loadFavoritesFailure({
                error: error.error?.message || 'Failed to load favorites',
              })
            );
          })
        )
      )
    )
  );

  toggleFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.toggleFavorite),
      switchMap(({ character }) =>
        this.favoritesService.toggleFavorite(character).pipe(
          map((response) => {
            const action = response.action as 'added' | 'removed';
            this.toastService.showSuccess(
              action === 'added'
                ? 'Added to favorites!'
                : 'Removed from favorites!'
            );
            return FavoritesActions.toggleFavoriteSuccess({
              character,
              action,
            });
          }),
          catchError((error) => {
            this.toastService.showError(
              error.error?.message || 'Failed to toggle favorite'
            );
            return of(
              FavoritesActions.toggleFavoriteFailure({
                error: error.error?.message || 'Failed to toggle favorite',
              })
            );
          })
        )
      )
    )
  );

  loadFavoritesSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FavoritesActions.loadFavoritesSuccess),
        tap(() => {
          // Optional: Show success message if needed
        })
      ),
    { dispatch: false }
  );
}
