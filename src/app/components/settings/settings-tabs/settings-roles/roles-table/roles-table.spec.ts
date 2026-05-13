import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolesTable } from './roles-table';
import { RoleService } from '../../../../../api/role.service';

describe('RolesTable', () => {
  let component: RolesTable;
  let fixture: ComponentFixture<RolesTable>;
  let mockRoleService: any;

  beforeEach(async () => {
    mockRoleService = {
      getAllRoles: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [RolesTable],
      providers: [{ provide: RoleService, useValue: mockRoleService }],
    }).compileComponents();

    fixture = TestBed.createComponent(RolesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
