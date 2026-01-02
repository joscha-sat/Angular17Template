import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { CancelBtnComponent } from './cancel-btn.component';

describe('CancelBtnComponent', () => {
  let component: CancelBtnComponent;
  let fixture: ComponentFixture<CancelBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelBtnComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CancelBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
