import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyPracticeComponent } from './daily-practice.component';

describe('DailyPracticeComponent', () => {
  let component: DailyPracticeComponent;
  let fixture: ComponentFixture<DailyPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyPracticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
