import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExpensesRepeatOptionsComponent } from './manage-expenses-repeat-options.component';

describe('ManageExpensesRepeatOptionsComponent', () => {
  let component: ManageExpensesRepeatOptionsComponent;
  let fixture: ComponentFixture<ManageExpensesRepeatOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageExpensesRepeatOptionsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageExpensesRepeatOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
