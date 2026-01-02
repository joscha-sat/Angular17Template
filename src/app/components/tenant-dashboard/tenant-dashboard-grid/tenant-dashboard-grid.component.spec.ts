import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TenantDashboardGridComponent } from './tenant-dashboard-grid.component';
import { TranslateModule } from '@ngx-translate/core';

describe('TenantDashboardGridComponent', () => {
  let component: TenantDashboardGridComponent;
  let fixture: ComponentFixture<TenantDashboardGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantDashboardGridComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantDashboardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
