import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewLayout } from './view-layout';

describe('ViewLayout', () => {
  let component: ViewLayout;
  let fixture: ComponentFixture<ViewLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
