import { createAction, props } from '@ngrx/store';
import { ICharacter } from '../../models';

export const loadFavorites = createAction('[Favorites] Load Favorites');

export const loadFavoritesSuccess = createAction(
  '[Favorites] Load Favorites Success',
  props<{ favorites: ICharacter[] }>()
);

export const loadFavoritesFailure = createAction(
  '[Favorites] Load Favorites Failure',
  props<{ error: string }>()
);

export const toggleFavorite = createAction(
  '[Favorites] Toggle Favorite',
  props<{ character: ICharacter }>()
);

export const toggleFavoriteSuccess = createAction(
  '[Favorites] Toggle Favorite Success',
  props<{ character: ICharacter; action: 'added' | 'removed' }>()
);

export const toggleFavoriteFailure = createAction(
  '[Favorites] Toggle Favorite Failure',
  props<{ error: string }>()
);

export const clearFavorites = createAction('[Favorites] Clear Favorites');
