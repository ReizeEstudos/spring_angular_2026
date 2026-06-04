import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupPage } from './followup-page';

describe('FollowupPage', () => {
  let component: FollowupPage;
  let fixture: ComponentFixture<FollowupPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowupPage],
    }).compileComponents();

    fixture = TestBed.createComponent(FollowupPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
