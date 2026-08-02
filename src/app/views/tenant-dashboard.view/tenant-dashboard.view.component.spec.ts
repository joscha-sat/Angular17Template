import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TenantDashboardViewComponent } from './tenant-dashboard.view.component';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { TenantDashboardGridComponent } from '../../components/tenant-dashboard/tenant-dashboard-grid/tenant-dashboard-grid.component';
import { TenantDashboardHeaderComponent } from '../../components/tenant-dashboard/tenant-dashboard-header/tenant-dashboard-header.component';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout.component';
import { ActivatedRoute } from '@angular/router';
import { TenantService } from '../../api/tenant.service';
import { of } from 'rxjs';

describe('TenantDashboardViewComponent', () => {
  let component: TenantDashboardViewComponent;
  let fixture: ComponentFixture<TenantDashboardViewComponent>;

  beforeEach(async () => {
    const mockActivatedRoute = {
      paramMap: of({
        get: vi.fn().mockReturnValue('1'),
      }),
    };

    const mockTenantService = {
      getTenantById: vi.fn().mockReturnValue(of({})),
    };

    await TestBed.configureTestingModule({
      imports: [
        TenantDashboardViewComponent,
        getTranslocoModule(),
        TenantDashboardGridComponent,
        TenantDashboardHeaderComponent,
        ViewLayoutComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: TenantService, useValue: mockTenantService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantDashboardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
