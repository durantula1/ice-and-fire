import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services';
import { ToastService } from '../../services/toast.service';
import * as AuthActions from './auth.actions';
import * as FavoritesActions from '../favorites/favorites.actions';
import { IUser } from '../../models';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((response: any) => {
            const user: IUser = {
              email,
              token: response.token || response.message,
            };
            localStorage.setItem('user', JSON.stringify(user));
            return AuthActions.loginSuccess({ user });
          }),
          catchError((error) => {
            this.toastService.showError(error.error?.message || 'Login failed');
            return of(
              AuthActions.loginFailure({
                error: error.error?.message || 'Login failed',
              })
            );
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
        this.toastService.showSuccess('Login successful! Welcome back.');
        this.router.navigate(['/characters']);
      }),
      map(() => FavoritesActions.loadFavorites())
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ email, password }) =>
        this.authService.register(email, password).pipe(
          map((response: any) => {
            const user: IUser = {
              email: response.email || email,
              token: response.token,
            };
            localStorage.setItem('user', JSON.stringify(user));
            return AuthActions.registerSuccess({ user });
          }),
          catchError((error) => {
            this.toastService.showError(
              error.error?.message || 'Registration failed'
            );
            return of(
              AuthActions.registerFailure({
                error: error.error?.message || 'Registration failed',
              })
            );
          })
        )
      )
    )
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerSuccess),
      tap(() => {
        this.toastService.showSuccess(
          'Registration successful! Welcome aboard.'
        );
        this.router.navigate(['/characters']);
      }),
      map(() => FavoritesActions.loadFavorites())
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem('user');
        this.router.navigate(['/']);
      }),
      map(() => FavoritesActions.clearFavorites())
    )
  );

  logoutSilent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutSilent),
      tap(() => {
        localStorage.removeItem('user');
        // Silent logout - no navigation, no message
      }),
      map(() => FavoritesActions.clearFavorites())
    )
  );

  loadUserFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUserFromStorage),
      map(() => {
        try {
          const userJson = localStorage.getItem('user');
          if (userJson) {
            const user: IUser = JSON.parse(userJson);
            // Validate user has required fields
            if (user.email && user.token) {
              return AuthActions.loadUserFromStorageSuccess({ user });
            }
          }
        } catch (error) {
          console.error('Error loading user from localStorage:', error);
          // Clear corrupted data
          localStorage.removeItem('user');
        }
        return AuthActions.logoutSilent();
      }),
      switchMap((action) => {
        if (action.type === AuthActions.loadUserFromStorageSuccess.type) {
          return [action, FavoritesActions.loadFavorites()];
        }
        return [action];
      })
    )
  );
}
