import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.model';
// import { UserService } from '../user.service';

import { Store, select } from '@ngrx/store';
import * as fromUser from '../user.reducer';
import * as UserActions from '../user.actions';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users: Observable<User[]> | undefined;
  isSaving: boolean = false;

  constructor(
    // private userService: UserService, 
    private store: Store<fromUser.UserState>
    ) {}

  ngOnInit(): void {
    console.log("Helloooooooooooooooo")
    this.users = this.store.pipe(select(fromUser.selectAllUsers));
    this.loadUsers();
  }

  loadUsers(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  toggleRow(user: User): void {
  }

  saveUsers(): void {
    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
    }, 2000);
  }

}
