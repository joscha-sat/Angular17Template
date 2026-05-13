import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { TenantHeaderComponent } from './tenant-header.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TenantService } from '../../../api/tenant.service';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';
import { TemplateTableSearchComponent } from '../../../shared/template-table-search/template-table-search.component';
import { MessageService } from 'primeng/api';

describe('TenantHeaderComponent', () => {
  let component: TenantHeaderComponent;
  let fixture: ComponentFixture<TenantHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TenantHeaderComponent,
        getTranslocoModule(),
        ReactiveFormsModule,
        HeaderLayoutComponent,
        TemplateTableSearchComponent,
      ],
      providers: [FormBuilder, TenantService, MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
