import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTableComponent } from './user-table.component';
import { UserService } from '../../../api/user.service';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { TemplateTableEnterFetchComponent } from '../../../shared/template-table-enter-fetch-method/template-table-enter-fetch.component';
import { of, type Observable } from 'rxjs';

type UserServiceMock = {
  getAllUsers: ReturnType<typeof vi.fn>;
  refreshObservable$: Observable<null>;
  search: ReturnType<typeof vi.fn>;
};

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;
  let mockUserService: UserServiceMock;

  beforeEach(async () => {
    mockUserService = {
      getAllUsers: vi.fn().mockReturnValue(of({ total: 0, records: [] })),
      refreshObservable$: of(null),
      search: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [UserTableComponent, getTranslocoModule(), TemplateTableEnterFetchComponent],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
