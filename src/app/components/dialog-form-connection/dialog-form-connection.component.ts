import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { tap, map, startWith } from 'rxjs/operators';
import { Connection } from 'src/app/models/Connection.model';
import { User } from 'src/app/models/User.model';
import { UtilService } from 'src/app/services/util.service';
import { addConnections } from 'src/app/state/connection.actions';
import { addUser } from 'src/app/state/users.actions';

@Component({
  selector: 'app-dialog-form-connection',
  templateUrl: './dialog-form-connection.component.html',
  styleUrls: ['./dialog-form-connection.component.scss'],
})
export class DialogFormConnectionComponent implements OnInit {
  submitButtonText: string = 'Add';
  users$: Observable<User[]> = this.STORE.pipe(select('users'));

  ConnectionFormGroup = new FormGroup({
    person1: new FormControl('', Validators.required),
    person2: new FormControl('', Validators.required),
  });

  // Stream of options for each person in the connection form
  options$: Observable<any> = combineLatest([
    this.users$,
    this.ConnectionFormGroup.valueChanges.pipe(
      startWith({ person1: '', person2: '' })
    ),
  ]).pipe(
    map(
      ([users, selections]: [User[], { person1: string; person2: string }]) => {
        return {
          p1Options: users.filter((user) => user.id !== selections.person2),
          p2Options: users.filter((user) => user.id !== selections.person2),
        };
      }
    )
  );

  constructor(
    private UTIL: UtilService,
    private STORE: Store<any>,
    public dialogRef: MatDialogRef<DialogFormConnectionComponent>,
    @Inject(MAT_DIALOG_DATA) public formData: any
  ) {}

  ngOnInit(): void {}

  discardFormClick() {
    this.dialogRef.close();
  }

  handleFormSubmit() {
    const newConnection = {
      connectionID: this.UTIL.generateUUID(),
      friends: Object.values(this.ConnectionFormGroup.value),
    } as Connection;

    this.STORE.dispatch(addConnections({ connections: [newConnection] }));
  }
}
