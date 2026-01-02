import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SaveBtnComponent } from './save-btn.component';

describe('SaveBtnComponent', () => {
  let component: SaveBtnComponent;
  let fixture: ComponentFixture<SaveBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveBtnComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SaveBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
