import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {Router} from '@angular/router';
import createSpyObj = jasmine.createSpyObj;
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        NavbarComponent,
        { provide: Router, useValue: createSpyObj<Router>('Router', ['navigate'])  }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
