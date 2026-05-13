import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewLayoutComponent } from './view-layout';

describe('ViewLayoutComponent', () => {
  let component: ViewLayoutComponent;
  let fixture: ComponentFixture<ViewLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
