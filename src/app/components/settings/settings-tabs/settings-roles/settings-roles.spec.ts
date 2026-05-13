import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsRolesComponent } from './settings-roles';
import { MessageService } from 'primeng/api';

describe('SettingsRolesComponent', () => {
  let component: SettingsRolesComponent;
  let fixture: ComponentFixture<SettingsRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsRolesComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
