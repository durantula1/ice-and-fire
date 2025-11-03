import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersListSkeleton } from './characters-list-skeleton';

describe('CharactersListSkeleton', () => {
  let component: CharactersListSkeleton;
  let fixture: ComponentFixture<CharactersListSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersListSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactersListSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
