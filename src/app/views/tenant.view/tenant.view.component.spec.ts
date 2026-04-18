import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TenantViewComponent } from './tenant.view.component';
import { TenantHeaderComponent } from '../../components/tenant/tenant-header/tenant-header.component';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout.component';
import { TenantTableComponent } from '../../components/tenant/tenant-table/tenant-table.component';
import { TenantService } from '../../api/tenant.service';
import { of } from 'rxjs';

describe('TenantViewComponent', () => {
  let component: TenantViewComponent;
  let fixture: ComponentFixture<TenantViewComponent>;

  beforeEach(async () => {
    const mockTenantService = {
      getAllTenants: vi.fn().mockReturnValue(of({ records: [] })),
      refreshObservable$: of(null),
      search: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        TenantViewComponent,
        TenantHeaderComponent,
        ViewLayoutComponent,
        TenantTableComponent,
      ],
      providers: [{ provide: TenantService, useValue: mockTenantService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
