import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserHeader } from './user-header';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { HeaderLayout } from '../../../other/layouts/header-layout/header-layout';
import { UserService } from '../../../api/user.service';
import { MessageService } from 'primeng/api';

describe('UserHeader', () => {
  let component: UserHeader;
  let fixture: ComponentFixture<UserHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHeader, getTranslocoModule(), HeaderLayout],
      providers: [UserService, MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(UserHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
