import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAddEditDialog } from './user-add-edit-dialog';
import { UserService } from '../../../../api/user.service';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { TranslocoService } from '@jsverse/transloco';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TwoInputsRowLayout } from '../../../../other/layouts/two-inputs-row-layout/two-inputs-row-layout';
import { RoleDropdown } from './role-dropdown/role-dropdown';
import { MessageService } from 'primeng/api';

describe('UserAddEditDialog', () => {
  let component: UserAddEditDialog;
  let fixture: ComponentFixture<UserAddEditDialog>;

  beforeEach(async () => {
    const mockUserService = {
      createOneUser: vi.fn().mockReturnValue(of({})),
      getAllRoles: vi.fn().mockReturnValue(of({})),
      updateUserById: vi.fn().mockReturnValue(of({})),
    };

    const mockFormBuilder = {
      group: vi.fn().mockReturnValue({
        value: {},
        patchValue: vi.fn(),
        setValue: vi.fn(),
        reset: vi.fn(),
        get: vi.fn(),
        controls: {},
        valid: true,
        invalid: false,
        pristine: true,
        dirty: false,
        touched: false,
        untouched: true,
        enable: vi.fn(),
        disable: vi.fn(),
        status: 'VALID',
        errors: null,
        _updateTreeValidity: vi.fn(),
        _registerOnCollectionChange: vi.fn(),
        _forEachChild: vi.fn(),
        _anyControls: vi.fn(),
        _syncPendingControls: vi.fn(),
        _applyFormState: vi.fn(),
        updateValueAndValidity: vi.fn(),
        setParent: vi.fn(),
        _updateAncestors: vi.fn(),
        _updateControlsErrors: vi.fn(),
      }),
    };

    await TestBed.configureTestingModule({
      imports: [UserAddEditDialog, getTranslocoModule(), ReactiveFormsModule, TwoInputsRowLayout, RoleDropdown],
      providers: [
        { provide: UserService, useValue: mockUserService },
        TranslocoService,
        { provide: NonNullableFormBuilder, useValue: mockFormBuilder },
        MessageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAddEditDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
