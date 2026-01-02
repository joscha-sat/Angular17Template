import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';

import { ApiSnackbarComponent } from './api-snackbar.component';

describe('ApiSnackbarComponent', () => {
  let component: ApiSnackbarComponent;
  let fixture: ComponentFixture<ApiSnackbarComponent>;

  beforeEach(async () => {
    const mockSnackbarData = {
      title: 'success' as const,
      data: null,
      i18nKeyOrMessage: 'Test message',
      errorStatus: 200,
      methodType: 'GET' as const,
      plural: false,
    };

    const mockSnackBarRef = {
      dismiss: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ApiSnackbarComponent, TranslateModule.forRoot()],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: mockSnackbarData },
        { provide: MatSnackBarRef, useValue: mockSnackBarRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
