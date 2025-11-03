import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IUser } from '../../core/models';
import {
  selectUser,
  selectIsAuthenticated,
} from '../../core/store/auth/auth.selectors';
import { selectFavoritesCount } from '../../core/store/favorites/favorites.selectors';
import * as AuthActions from '../../core/store/auth/auth.actions';
import { HEADER_MENU_ITEMS } from '../../core';

@Component({
  selector: 'app-header',
  imports: [
    ToolbarModule,
    MenuModule,
    ButtonModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private router = inject(Router);
  private store = inject(Store);

  protected menuItems: MenuItem[] = HEADER_MENU_ITEMS;
  protected user: Signal<IUser | null | undefined> = toSignal(
    this.store.select(selectUser)
  );
  protected isAuthenticated: Signal<boolean | undefined> = toSignal(
    this.store.select(selectIsAuthenticated)
  );
  protected favoritesCount: Signal<number> = toSignal(
    this.store.select(selectFavoritesCount),
    { initialValue: 0 }
  );

  protected onLogin() {
    this.router.navigate(['/login']);
  }

  protected onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

  protected navigateToLanding() {
    this.router.navigate(['/']);
  }
}
