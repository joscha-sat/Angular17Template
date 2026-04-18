import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserHeaderComponent } from './user-header.component';
import { getTranslocoModule } from '@app/other/transloco-testing';
import { HeaderLayoutComponent } from '../../../other/layouts/header-layout/header-layout.component';
import { UserService } from '../../../api/user.service';

describe('UserHeaderComponent', () => {
  let component: UserHeaderComponent;
  let fixture: ComponentFixture<UserHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserHeaderComponent,
        getTranslocoModule(),
        HeaderLayoutComponent,
      ],
      providers: [UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(UserHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
