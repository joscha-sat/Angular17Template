import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserHeaderComponent } from './user-header';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout';
import { UserService } from '../../../api/user.service';
import { MessageService } from 'primeng/api';

describe('UserHeaderComponent', () => {
  let component: UserHeaderComponent;
  let fixture: ComponentFixture<UserHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHeaderComponent, getTranslocoModule(), HeaderLayoutComponent],
      providers: [UserService, MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(UserHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
