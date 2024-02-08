import { Component, inject, OnInit, signal } from "@angular/core";
import { UserHeaderComponent } from "../../components/user/user-header/user-header.component";
import { UserTableComponent } from "../../components/user/user-table/user-table.component";
import { User } from "../../models/User";
import { UserService } from "../../api/user.service";
import { toObservable } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-user.view",
  standalone: true,
  imports: [
    UserHeaderComponent,
    UserTableComponent,
  ],
  templateUrl: "./user.view.component.html",
  styleUrl: "./user.view.component.scss",
})
export class UserViewComponent implements OnInit {
  // | services | --------------------------------------------------------------------------  ||
  userService = inject(UserService);

  // | signals / vars | --------------------------------------------------------------------  ||
  users = signal<User[]>([]);
  users$ = toObservable<User[]>(this.users);

  // | init | ------------------------------------------------------------------------------  ||
  ngOnInit(): void {
    this.getUsers();
  }

  // | normal methods | --------------------------------------------------------------------  ||
  getUsers() {
    this.userService.getUsers().subscribe((user: User[]) => {
      this.users.set(user);
    });
  }
}


