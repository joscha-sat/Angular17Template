import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginViewComponent } from './login.view.component';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { LoginFormComponent } from '../../components/login/login-form/login-form.component';
import { MatCardModule } from '@angular/material/card';
import { LoginHeaderComponent } from '../../components/login/login-header/login-header.component';

describe('LoginViewComponent', () => {
  let component: LoginViewComponent;
  let fixture: ComponentFixture<LoginViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginViewComponent, getTranslocoModule(), LoginFormComponent, MatCardModule, LoginHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
