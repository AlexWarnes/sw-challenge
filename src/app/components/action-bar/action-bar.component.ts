import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';
import { addUser } from 'src/app/state/users.actions';
import { DialogFormUserComponent } from '../dialog-form-user/dialog-form-user.component';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss'],
})
export class ActionBarComponent implements OnInit {
  constructor(
    private STORE: Store,
    private USER: UserService,
    private DIALOG: MatDialog
  ) {}

  ngOnInit(): void {}

  handleFakeUserClick(): void {
    const newUser = this.USER.generateRandomUser();
    this.STORE.dispatch(addUser({ user: newUser }));
  }
  handleNewUserClick(): void {
    this.openAddUserDialogForm();
  }
  handleNewConnectionClick(): void {
    console.log('handleNewConnectionClick');
  }
  handleSeedDatabaseClick(): void {
    const seedInterval = setInterval(() => {
      this.handleFakeUserClick();
    }, 500)

    setTimeout(() => clearInterval(seedInterval), 5000)
  }
  openAddUserDialogForm() {
    this.DIALOG.open(DialogFormUserComponent, {
      minWidth: '50vw',
      minHeight: '50vh',
      panelClass: 'dialog-form',
      data: {
        formType: 'CREATE',
      },
    });
  }
}
