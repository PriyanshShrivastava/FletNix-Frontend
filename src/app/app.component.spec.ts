// Importing necessary components and libraries
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';

// Test suite for the AppComponent
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  // Async beforeEach block to configure the TestBed before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Configuring RouterTestingModule to import the router-related dependencies
      imports: [RouterTestingModule],
      // Declaring AppComponent as the component to be tested
      declarations: [AppComponent],
    }).compileComponents();
  });

  // Synchronous beforeEach block to create the component fixture before each test
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  // Test to ensure that the AppComponent is created
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // Test to ensure that the isHomePage function returns true when the current URL is '/'
  it('should return true if current route is homepage', () => {
    // Using spyOnProperty to mock the 'url' property of the router and return '/'
    spyOnProperty(router, 'url').and.returnValue('/');
    expect(component.isHomePage()).toBeTruthy();
  });

  // Test to ensure that the isHomePage function returns false when the current URL is not '/'
  it('should return false if current route is not homepage', () => {
    // Using spyOnProperty to mock the 'url' property of the router and return '/about'
    spyOnProperty(router, 'url').and.returnValue('/about');
    expect(component.isHomePage()).toBeFalsy();
  });
});
