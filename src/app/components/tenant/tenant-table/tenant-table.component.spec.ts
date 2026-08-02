import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TenantTableComponent } from './tenant-table.component';
import { TenantService } from '../../../api/tenant.service';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { TemplateTableEnterFetchComponent } from '../../../shared/template-table-enter-fetch-method/template-table-enter-fetch.component';
import { of } from 'rxjs';

describe('TenantTableComponent', () => {
  let component: TenantTableComponent;
  let fixture: ComponentFixture<TenantTableComponent>;
  let mockTenantService: any;

  beforeEach(async () => {
    mockTenantService = {
      getAllTenants: vi.fn().mockReturnValue(of({ total: 0, records: [] })),
      refreshObservable$: of(null),
      search: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TenantTableComponent, getTranslocoModule(), TemplateTableEnterFetchComponent],
      providers: [{ provide: TenantService, useValue: mockTenantService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
