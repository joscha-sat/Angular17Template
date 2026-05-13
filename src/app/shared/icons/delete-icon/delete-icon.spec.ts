import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIcon } from './delete-icon';

describe('DeleteIcon', () => {
  let component: DeleteIcon;
  let fixture: ComponentFixture<DeleteIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
