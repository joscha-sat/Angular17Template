import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TwoInputsRowLayout } from './two-inputs-row-layout';

describe('TwoInputsRowLayout', () => {
  let component: TwoInputsRowLayout;
  let fixture: ComponentFixture<TwoInputsRowLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoInputsRowLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(TwoInputsRowLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
