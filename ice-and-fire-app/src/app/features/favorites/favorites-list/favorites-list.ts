import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { ICharacter } from '../../../core/models';
import {
  selectFavorites,
  selectFavoritesLoading,
  selectFavoritesError,
} from '../../../core/store/favorites/favorites.selectors';
import { selectIsAuthenticated } from '../../../core/store/auth/auth.selectors';
import { CharacterCard } from '../../../shared/components/character-card/character-card';
import { PageTitleSection } from '../../../shared/components/page-title-section/page-title-section';
import { StatusMessage } from '../components/status-message/status-message';

@Component({
  selector: 'app-favorites-list',
  imports: [CharacterCard, PageTitleSection, StatusMessage],
  templateUrl: './favorites-list.html',
  styleUrl: './favorites-list.scss',
})
export class FavoritesList {
  private store = inject(Store);
  protected favorites: Signal<ICharacter[]> = toSignal(
    this.store.select(selectFavorites),
    { initialValue: [] }
  );

  protected loading: Signal<boolean> = toSignal(
    this.store.select(selectFavoritesLoading),
    { initialValue: false }
  );

  protected error: Signal<string | null> = toSignal(
    this.store.select(selectFavoritesError),
    { initialValue: null }
  );

  protected isAuthenticated: Signal<boolean | undefined> = toSignal(
    this.store.select(selectIsAuthenticated)
  );
}
