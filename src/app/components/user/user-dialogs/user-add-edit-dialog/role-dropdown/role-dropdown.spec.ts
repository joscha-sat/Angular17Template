import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleDropdown } from './role-dropdown';
import { MessageService } from 'primeng/api';

describe('RoleDropdown', () => {
  let component: RoleDropdown;
  let fixture: ComponentFixture<RoleDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleDropdown],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(RoleDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
