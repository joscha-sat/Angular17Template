import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTable } from './user-table';
import { UserService } from '../../../api/user.service';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { TemplateTableEnterFetch } from '../../../shared/template-table-enter-fetch-method/template-table-enter-fetch';
import { of } from 'rxjs';

describe('UserTable', () => {
  let component: UserTable;
  let fixture: ComponentFixture<UserTable>;
  let mockUserService: any;

  beforeEach(async () => {
    mockUserService = {
      getAllUsers: vi.fn().mockReturnValue(of({ total: 0, records: [] })),
      refreshObservable$: of(null),
      search: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [UserTable, getTranslocoModule(), TemplateTableEnterFetch],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('registers the name template for user rows', () => {
    const customCellTemplates: Record<string, unknown> = (
      component as unknown as { customCellTemplates: () => Record<string, unknown> }
    ).customCellTemplates();

    expect(customCellTemplates['name']).toBeDefined();
  });
});
