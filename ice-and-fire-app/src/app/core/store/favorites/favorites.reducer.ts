import { createReducer, on } from '@ngrx/store';
import { ICharacter } from '../../models';
import * as FavoritesActions from './favorites.actions';

export interface FavoritesState {
  favorites: ICharacter[];
  loading: boolean;
  error: string | null;
}

export const initialState: FavoritesState = {
  favorites: [],
  loading: false,
  error: null,
};

export const favoritesReducer = createReducer(
  initialState,

  on(FavoritesActions.loadFavorites, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(FavoritesActions.loadFavoritesSuccess, (state, { favorites }) => ({
    ...state,
    favorites,
    loading: false,
    error: null,
  })),

  on(FavoritesActions.loadFavoritesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(FavoritesActions.toggleFavorite, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(FavoritesActions.toggleFavoriteSuccess, (state, { character, action }) => {
    let favorites: ICharacter[];

    if (action === 'added') {
      // Add to favorites if not already present
      const exists = state.favorites.some((fav) => fav.url === character.url);
      favorites = exists ? state.favorites : [...state.favorites, character];
    } else {
      // Remove from favorites
      favorites = state.favorites.filter((fav) => fav.url !== character.url);
    }

    return {
      ...state,
      favorites,
      loading: false,
      error: null,
    };
  }),

  on(FavoritesActions.toggleFavoriteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(FavoritesActions.clearFavorites, () => initialState)
);
