import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConcertComponent } from './admin-concert.component';

describe('AdminConcertComponent', () => {
  let component: AdminConcertComponent;
  let fixture: ComponentFixture<AdminConcertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConcertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConcertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
