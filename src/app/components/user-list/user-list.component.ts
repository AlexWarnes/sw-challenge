import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { DialogFormConnectionComponent } from '../dialog-form-connection/dialog-form-connection.component';
import { DialogFormUserComponent } from '../dialog-form-user/dialog-form-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]> = this.STORE.pipe(select('users'));
  constructor(
    private STORE: Store<{ users: User[] }>,
    private DIALOG: MatDialog
  ) {}

  ngOnInit(): void {
    this.users$.subscribe(console.log);
  }

  handleNewUserClick() {
    this.openAddUserDialogForm();
  }

  trackByID(index: number, user: User) {
    return user.id;
  }

  openAddUserDialogForm() {
    this.DIALOG.open(DialogFormUserComponent, {
      panelClass: 'dialog-form',
      data: {
        formType: 'CREATE',
      },
    });
  }

  handleNewConnectionClick(): void {
    console.log('handleNewConnectionClick');
    this.openAddConnectionDialogForm();
  }
  openAddConnectionDialogForm() {
    this.DIALOG.open(DialogFormConnectionComponent, {
      panelClass: 'dialog-form',
    });
  }
}
