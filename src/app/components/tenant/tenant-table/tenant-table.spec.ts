import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TenantTable } from './tenant-table';
import { TenantService } from '../../../api/tenant.service';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { TemplateTableEnterFetch } from '../../../shared/template-table-enter-fetch-method/template-table-enter-fetch';
import { of } from 'rxjs';

describe('TenantTable', () => {
  let component: TenantTable;
  let fixture: ComponentFixture<TenantTable>;
  let mockTenantService: any;

  beforeEach(async () => {
    mockTenantService = {
      getAllTenants: vi.fn().mockReturnValue(of({ total: 0, records: [] })),
      refreshObservable$: of(null),
      search: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TenantTable, getTranslocoModule(), TemplateTableEnterFetch],
      providers: [{ provide: TenantService, useValue: mockTenantService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
