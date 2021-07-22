import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';
import { addUser } from 'src/app/state/users.actions';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss'],
})
export class ActionBarComponent implements OnInit {
  constructor(private STORE: Store, private USER: UserService) {}

  ngOnInit(): void {}

  handleSeedUsersClick(): void {
    const newUser = this.USER.generateRandomUser();
    this.STORE.dispatch(addUser({ user: newUser }));
  }
  handleNewUserClick(): void {
    console.log('handleNewUserClick');
  }
  handleNewConnectionClick(): void {
    console.log('handleNewConnectionClick');
  }
}
