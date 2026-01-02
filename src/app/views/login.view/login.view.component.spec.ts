import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginViewComponent } from './login.view.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoginFormComponent } from '../../components/login/login-form/login-form.component';
import { MatCardModule } from '@angular/material/card';
import { LoginHeaderComponent } from '../../components/login/login-header/login-header.component';

describe('LoginViewComponent', () => {
  let component: LoginViewComponent;
  let fixture: ComponentFixture<LoginViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginViewComponent,
        TranslateModule.forRoot(),
        LoginFormComponent,
        MatCardModule,
        LoginHeaderComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
