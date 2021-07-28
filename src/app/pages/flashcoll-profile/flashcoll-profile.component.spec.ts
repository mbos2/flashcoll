import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcollProfileComponent } from './flashcoll-profile.component';

describe('FlashcollProfileComponent', () => {
  let component: FlashcollProfileComponent;
  let fixture: ComponentFixture<FlashcollProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcollProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcollProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
