import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsRoles } from './settings-roles';
import { MessageService } from 'primeng/api';

describe('SettingsRoles', () => {
  let component: SettingsRoles;
  let fixture: ComponentFixture<SettingsRoles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsRoles],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsRoles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
