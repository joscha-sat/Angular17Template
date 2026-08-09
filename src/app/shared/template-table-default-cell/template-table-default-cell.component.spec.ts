import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplateTableDefaultCellComponent } from './template-table-default-cell.component';

describe('TemplateTableDefaultCellComponent', () => {
  let component: TemplateTableDefaultCellComponent;
  let fixture: ComponentFixture<TemplateTableDefaultCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateTableDefaultCellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateTableDefaultCellComponent);
    component = fixture.componentInstance;
  });

  it('should render plain values by default', () => {
    fixture.componentRef.setInput('value', 'Test value');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Test value');
  });

  it('should format date values', () => {
    fixture.componentRef.setInput('value', new Date('2026-01-01T00:00:00.000Z'));
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('01.01.2026');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
