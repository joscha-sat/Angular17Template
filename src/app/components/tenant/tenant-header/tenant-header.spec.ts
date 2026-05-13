import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { TenantHeader } from './tenant-header';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TenantService } from '../../../api/tenant.service';
import { HeaderLayout } from '../../../other/layouts/header-layout/header-layout';
import { TemplateTableSearch } from '../../../shared/template-table-search/template-table-search';
import { MessageService } from 'primeng/api';

describe('TenantHeader', () => {
  let component: TenantHeader;
  let fixture: ComponentFixture<TenantHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TenantHeader,
        getTranslocoModule(),
        ReactiveFormsModule,
        HeaderLayout,
        TemplateTableSearch,
      ],
      providers: [FormBuilder, TenantService, MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
