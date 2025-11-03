import {
  Component,
  inject,
  input,
  signal,
  computed,
  OnInit,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { CharacterService } from '../../../core/services/character.service';
import { ICharacter } from '../../../core';
import { isCharacterInFavorites } from '../../../core/utils';
import { selectIsAuthenticated } from '../../../core/store/auth/auth.selectors';
import * as FavoritesActions from '../../../core/store/favorites/favorites.actions';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CharacterInfoSkeleton } from '../components/character-info-skeleton/character-info-skeleton';
import { CharacterInfoField } from '../components/character-info-field/character-info-field';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-character-info',
  imports: [
    CardModule,
    TagModule,
    ButtonModule,
    CharacterInfoSkeleton,
    CharacterInfoField,
    TooltipModule,
  ],
  templateUrl: './character-info.html',
  styleUrl: './character-info.scss',
})
export class CharacterInfo implements OnInit {
  private characterService = inject(CharacterService);
  private location = inject(Location);
  private store = inject(Store);

  id = input<string>('');
  character = signal<ICharacter | null>(null);
  loading = signal(true);

  protected isAuthenticated: Signal<boolean | undefined> = toSignal(
    this.store.select(selectIsAuthenticated)
  );

  protected favorites: Signal<ICharacter[]> = toSignal(
    this.store.select((state) => state.favorites.favorites),
    { initialValue: [] }
  );

  protected isFavorite = computed(() =>
    isCharacterInFavorites(this.character(), this.favorites())
  );

  hasFather = computed(() => (this.character()?.father ? 'yes' : 'no'));
  hasMother = computed(() => (this.character()?.mother ? 'yes' : 'no'));
  hasSpouse = computed(() => (this.character()?.spouse ? 'yes' : 'no'));

  ngOnInit(): void {
    this.loading.set(true);
    this.characterService.getCharacterInfo(this.id()).subscribe({
      next: (character) => {
        this.character.set(character);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading character:', error);
        this.loading.set(false);
      },
    });
  }

  onGoBack(): void {
    this.location.back();
  }

  onToggleFavorite(): void {
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
