import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTitleSection } from './page-title-section';

describe('PageTitleSection', () => {
  let component: PageTitleSection;
  let fixture: ComponentFixture<PageTitleSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTitleSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTitleSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
