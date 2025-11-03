import { Component, inject, input, Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import {
  getCharacterIdFromUrl,
  ICharacter,
  isCharacterInFavorites,
  selectIsAuthenticated,
} from '../../../core';
import * as FavoritesActions from '../../../core/store/favorites/favorites.actions';

@Component({
  selector: 'app-character-card',
  imports: [CardModule, TagModule, ButtonModule, TooltipModule],
  templateUrl: './character-card.html',
  styleUrl: './character-card.scss',
})
export class CharacterCard {
  private router = inject(Router);
  private store = inject(Store);

  character = input<ICharacter>();

  protected isAuthenticated: Signal<boolean | undefined> = toSignal(
    this.store.select(selectIsAuthenticated)
  );

  protected favorites: Signal<ICharacter[]> = toSignal(
    this.store.select((state) => state.favorites.favorites),
    { initialValue: [] }
  );

  protected isFavorite = computed(() => {
    return isCharacterInFavorites(this.character(), this.favorites());
  });

  onCharacterInfoClick(characterUrl: string): void {
    const characterId = getCharacterIdFromUrl(characterUrl);
    this.router.navigate(['/characters', characterId]);
  }

  onToggleFavorite(event: Event): void {
    event.stopPropagation();

    if (!this.isAuthenticated() || !this.character()) {
      return;
    }

    this.store.dispatch(
      FavoritesActions.toggleFavorite({
        character: this.character()!,
      })
    );
  }
}
