import {
  Component,
  inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
  effect,
  computed,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  combineLatest,
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  of,
  switchMap,
} from 'rxjs';
import { CharacterCard } from '../../../shared/components/character-card/character-card';
import { PageTitleSection } from '../../../shared/components/page-title-section/page-title-section';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { CharactersListSkeleton } from '../components/characters-list-skeleton/characters-list-skeleton';
import { CARDS_SKELETON_COUNT, CharacterService } from '../../../core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-characters-list',
  imports: [
    CharacterCard,
    PageTitleSection,
    CardModule,
    PaginatorModule,
    CharactersListSkeleton,
  ],
  templateUrl: './characters-list.html',
  styleUrl: './characters-list.scss',
})
export class CharactersList implements AfterViewInit {
  private characterService = inject(CharacterService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  @ViewChild('charactersContent', { static: false })
  charactersContentRef!: ElementRef<HTMLDivElement>;
  private isInitialized = false;
  readonly CARDS_SKELETON_COUNT = CARDS_SKELETON_COUNT;
  readonly loading = signal(false);

  readonly currentPage = signal(1);
  readonly pageSize = signal(50);
  readonly searchTerm = signal('');

  readonly queryParams = computed(() => ({
    page: this.currentPage(),
    pageSize: this.pageSize(),
    name: this.searchTerm().trim(),
  }));

  readonly characters = toSignal(
    combineLatest([
      toObservable(this.currentPage),
      toObservable(this.pageSize),
      toObservable(this.searchTerm).pipe(
        debounceTime(300),
        distinctUntilChanged()
      ),
    ]).pipe(
      switchMap(([page, pageSize, name]) => {
        this.loading.set(true);
        return this.characterService
          .getCharactersList(page, pageSize, name)
          .pipe(
            catchError((error) => {
              console.error('Error loading characters:', error);
              return of([]);
            }),
            finalize(() => this.loading.set(false))
          );
      })
    ),
    { initialValue: undefined }
  );

  constructor() {
    this.initializeFromQueryParams();

    effect(() => {
      const { page, pageSize, name } = this.queryParams();
      const currentQuery = this.route.snapshot.queryParams;

      if (!this.isInitialized) {
        this.isInitialized = true;
        return;
      }

      const currentPage = parseInt(currentQuery['page']) || 1;
      const currentPageSize = parseInt(currentQuery['pageSize']) || 50;
      const currentName = currentQuery['name'] || '';

      if (
        currentPage !== page ||
        currentPageSize !== pageSize ||
        currentName !== name
      ) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { page, pageSize, name: name || null },
          queryParamsHandling: 'merge',
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.scrollToTop();
  }

  private initializeFromQueryParams(): void {
    this.loading.set(true);
    const query = this.route.snapshot.queryParams;
    this.currentPage.set(parseInt(query['page']) || 1);
    this.pageSize.set(parseInt(query['pageSize']) || 50);
    this.searchTerm.set(query['name'] || '');
  }

  onPageChange(event: any): void {
    this.currentPage.set(event.page + 1);
    this.pageSize.set(event.rows);
    this.scrollToTop();
  }

  private scrollToTop(): void {
    this.charactersContentRef?.nativeElement?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
