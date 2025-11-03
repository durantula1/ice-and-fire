import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterInfoSkeleton } from './character-info-skeleton';

describe('CharacterInfoSkeleton', () => {
  let component: CharacterInfoSkeleton;
  let fixture: ComponentFixture<CharacterInfoSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterInfoSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterInfoSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
