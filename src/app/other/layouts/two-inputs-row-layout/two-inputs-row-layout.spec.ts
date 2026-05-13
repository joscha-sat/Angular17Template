import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TwoInputsRowLayoutComponent } from './two-inputs-row-layout';

describe('TwoInputsRowLayoutComponent', () => {
  let component: TwoInputsRowLayoutComponent;
  let fixture: ComponentFixture<TwoInputsRowLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoInputsRowLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TwoInputsRowLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
