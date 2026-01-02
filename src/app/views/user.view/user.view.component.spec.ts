import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserViewComponent } from './user.view.component';
import { UserHeaderComponent } from '../../components/user/user-header/user-header.component';
import { ViewLayoutComponent } from '../../other/layouts/view-layout/view-layout.component';
import { UserTableComponent } from '../../components/user/user-table/user-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from '../../api/user.service';
import { of } from 'rxjs';

describe('UserViewComponent', () => {
  let component: UserViewComponent;
  let fixture: ComponentFixture<UserViewComponent>;

  beforeEach(async () => {
    const mockUserService = {
      getAllUsers: vi.fn().mockReturnValue(of({ records: [] })),
      refreshObservable$: of(null),
      search: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        UserViewComponent,
        UserHeaderComponent,
        ViewLayoutComponent,
        UserTableComponent,
        TranslateModule.forRoot(),
      ],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
