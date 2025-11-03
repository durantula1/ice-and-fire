import { Routes } from '@angular/router';
import { authGuard } from './core';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing').then((m) => m.Landing),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then((m) => m.Register),
  },
  {
    path: 'characters',
    loadComponent: () =>
      import('./features/characters/characters-list/characters-list').then(
        (m) => m.CharactersList
      ),
  },
  {
    path: 'characters/:id',
    loadComponent: () =>
      import('./features/characters/character-info/character-info').then(
        (m) => m.CharacterInfo
      ),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./features/favorites/favorites-list/favorites-list').then(
        (m) => m.FavoritesList
      ),
    // canActivate: [authGuard],
  },
];
