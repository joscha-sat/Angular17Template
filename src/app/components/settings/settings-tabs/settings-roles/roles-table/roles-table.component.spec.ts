import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { RolesTableComponent } from './roles-table.component';
import { RoleService } from '../../../../../api/role.service';

type RoleServiceMock = {
  getAllRoles: ReturnType<typeof vi.fn>;
};

describe('RolesTableComponent', () => {
  let component: RolesTableComponent;
  let fixture: ComponentFixture<RolesTableComponent>;
  let mockRoleService: RoleServiceMock;

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
