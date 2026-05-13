import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolesTableComponent } from './roles-table';
import { RoleService } from '../../../../../api/role.service';

describe('RolesTableComponent', () => {
  let component: RolesTableComponent;
  let fixture: ComponentFixture<RolesTableComponent>;
  let mockRoleService: any;

  beforeEach(async () => {
    mockRoleService = {
      getAllRoles: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [RolesTableComponent],
      providers: [{ provide: RoleService, useValue: mockRoleService }],
    }).compileComponents();

    fixture = TestBed.createComponent(RolesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
