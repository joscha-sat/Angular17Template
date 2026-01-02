import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TenantDashboardHeaderComponent } from './tenant-dashboard-header.component';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';

describe('TenantDashboardHeaderComponent', () => {
  let component: TenantDashboardHeaderComponent;
  let fixture: ComponentFixture<TenantDashboardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TenantDashboardHeaderComponent,
        TranslateModule.forRoot(),
        HeaderLayoutComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantDashboardHeaderComponent);
    component = fixture.componentInstance;

    // Set required input using setInput
    fixture.componentRef.setInput('tenant', { name: 'Test Tenant' });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
