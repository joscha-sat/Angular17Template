import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TenantHeaderComponent } from './tenant-header.component';
import { TranslateModule } from '@ngx-translate/core';
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
        TranslateModule.forRoot(),
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
