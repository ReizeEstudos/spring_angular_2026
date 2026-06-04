import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupForm } from './followup-form';

describe('FollowupForm', () => {
  let component: FollowupForm;
  let fixture: ComponentFixture<FollowupForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowupForm],
    }).compileComponents();

    fixture = TestBed.createComponent(FollowupForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
