import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupTable } from './followup-table';

describe('FollowupTable', () => {
  let component: FollowupTable;
  let fixture: ComponentFixture<FollowupTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowupTable],
    }).compileComponents();

    fixture = TestBed.createComponent(FollowupTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
