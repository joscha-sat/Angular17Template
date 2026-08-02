import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { TenantHeaderComponent } from './tenant-header.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TenantService } from '../../../api/tenant.service';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';
import { MatButton } from '@angular/material/button';
import { TemplateTableSearchComponent } from '../../../shared/template-table-search/template-table-search.component';

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
        MatButton,
        TemplateTableSearchComponent,
      ],
      providers: [FormBuilder, TenantService],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
