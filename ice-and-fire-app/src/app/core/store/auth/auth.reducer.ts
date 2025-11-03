import { createReducer, on } from '@ngrx/store';
import { IUser } from '../../models';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: IUser | null;
}

export const initialState: AuthState = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(AuthActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(AuthActions.logout, () => ({
    ...initialState,
  })),
  on(AuthActions.logoutSilent, () => ({
    ...initialState,
  })),
  on(AuthActions.loadUserFromStorageSuccess, (state, { user }) => ({
    ...state,
    user,
  }))
);
