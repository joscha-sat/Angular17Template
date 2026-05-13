import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIcon } from './edit-icon';

describe('EditIcon', () => {
  let component: EditIcon;
  let fixture: ComponentFixture<EditIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(EditIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
