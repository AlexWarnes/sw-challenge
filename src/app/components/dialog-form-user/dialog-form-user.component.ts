import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/User.model';
import { UtilService } from 'src/app/services/util.service';
import { addUser } from 'src/app/state/users.actions';

@Component({
  selector: 'app-dialog-form-user',
  templateUrl: './dialog-form-user.component.html',
  styleUrls: ['./dialog-form-user.component.scss'],
})
export class DialogFormUserComponent implements OnInit {
  submitButtonText: string = '';
  UserFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    weight: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  constructor(
    private UTIL: UtilService,
    private STORE: Store,
    public dialogRef: MatDialogRef<DialogFormUserComponent>,
    @Inject(MAT_DIALOG_DATA) public formData: any
  ) {}

  ngOnInit(): void {
    if (this.formData.formType === 'CREATE') {
      this.submitButtonText = 'Add';
    } else if (this.formData.formType === 'UPDATE') {
      this.submitButtonText = 'Update';
      const { name, age, weight } = this.formData.incentiveData;
      this.UserFormGroup.setValue({ name, age, weight });
    }
  }

  discardFormClick() {
    this.dialogRef.close();
  }

  handleFormSubmit() {
    if (this.formData.formType === 'CREATE') {
      this.createUser();
    } else if (this.formData.formType === 'UPDATE') {
      this.updateIncentive();
    }
  }

  createUser() {
    const newUser: User = {
      id: this.UTIL.generateUUID(),
      ...this.UserFormGroup.value,
    };
    this.STORE.dispatch(addUser({user: newUser}));

    this.dialogRef.close();
  }

  updateIncentive() {
    //const updatedUser = {...this.formData.userData, ...this.UserFormGroup.value};
    // TODO: PUT request to update user
  }
}
