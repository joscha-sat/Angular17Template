import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAddEditDialogComponent } from './user-add-edit-dialog.component';
import { UserService } from '../../../../api/user.service';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { TranslocoService } from '@jsverse/transloco';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TwoInputsRowLayoutComponent } from '../../../../other/layouts/two-inputs-row-layout/two-inputs-row-layout.component';
import { RoleDropdownComponent } from './role-dropdown/role-dropdown.component';

describe('UserAddEditDialogComponent', () => {
  let component: UserAddEditDialogComponent;
  let fixture: ComponentFixture<UserAddEditDialogComponent>;

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
      imports: [
        UserAddEditDialogComponent,
        getTranslocoModule(),
        ReactiveFormsModule,
        TwoInputsRowLayoutComponent,
        RoleDropdownComponent,
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        TranslocoService,
        { provide: NonNullableFormBuilder, useValue: mockFormBuilder },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
