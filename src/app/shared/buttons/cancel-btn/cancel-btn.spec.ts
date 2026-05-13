import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '@app/other/transloco-testing';

import { CancelBtn } from './cancel-btn';

describe('CancelBtn', () => {
  let component: CancelBtn;
  let fixture: ComponentFixture<CancelBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelBtn, getTranslocoModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(CancelBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
