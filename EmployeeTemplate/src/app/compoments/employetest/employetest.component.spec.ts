import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployetestComponent } from './employetest.component';

describe('EmployetestComponent', () => {
  let component: EmployetestComponent;
  let fixture: ComponentFixture<EmployetestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployetestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
