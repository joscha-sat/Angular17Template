import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

describe('AppComponent with proper setup', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: appConfig.providers,
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
