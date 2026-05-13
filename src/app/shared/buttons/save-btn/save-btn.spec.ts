import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { SaveBtn } from './save-btn';

describe('SaveBtn', () => {
  let component: SaveBtn;
  let fixture: ComponentFixture<SaveBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveBtn, getTranslocoModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(SaveBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
