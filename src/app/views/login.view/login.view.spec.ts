import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginView } from './login.view';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { LoginForm } from '../../components/login/login-form/login-form';
import { LoginHeader } from '../../components/login/login-header/login-header';

describe('LoginView', () => {
  let component: LoginView;
  let fixture: ComponentFixture<LoginView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginView, getTranslocoModule(), LoginForm, LoginHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
