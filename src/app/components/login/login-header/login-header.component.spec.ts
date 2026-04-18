import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '@app/other/transloco-testing';

import { LoginHeaderComponent } from './login-header.component';

describe('LoginHeaderComponent', () => {
  let component: LoginHeaderComponent;
  let fixture: ComponentFixture<LoginHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginHeaderComponent, getTranslocoModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
