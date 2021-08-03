import {
  Component,
  Inject,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/User.model';
import { UtilService } from 'src/app/services/util.service';
import { addUser } from 'src/app/state/users.actions';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { debounceTime, filter, map, startWith, tap } from 'rxjs/operators';
import { addConnections } from 'src/app/state/connection.actions';
import { Connection } from 'src/app/models/Connection.model';

@Component({
  selector: 'app-dialog-form-user',
  templateUrl: './dialog-form-user.component.html',
  styleUrls: ['./dialog-form-user.component.scss'],
})
export class DialogFormUserComponent implements OnInit {
  submitButtonText: string = '';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  UserFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    weight: new FormControl(100, [Validators.required, Validators.min(1)]),
    'friend-input': new FormControl(''),
  });
  allFriends$: Observable<User[]> = this.STORE.select('users').pipe(
    filter((u) => !!u)
  );
  dynamicFriends$: BehaviorSubject<any> = new BehaviorSubject([]);
  filteredFriends$: Observable<any> = combineLatest([
    this.allFriends$,
    this.dynamicFriends$,
    this.UserFormGroup.get('friend-input')?.valueChanges.pipe(startWith(null)),
  ]).pipe(
    debounceTime(50),
    map(([allFriends, selectedFriends, inputText]: any) => {
      const selectedIDs = selectedFriends?.map((u: User) => u.id);
      const options = allFriends?.filter(
        (f: User) => !selectedIDs.includes(f.id)
      );
      const matchingOptions = this.friendOptionsMatchingText(
        options,
        inputText
      );
      return matchingOptions;
    })
  );

  @ViewChild('friendInput') friendInput: ElementRef<HTMLInputElement> | null =
    null;

  subs: Subscription = new Subscription();

  constructor(
    private UTIL: UtilService,
    private STORE: Store<any>,
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
      this.updateUser();
    }
  }

  createUser() {
    const { name, age, weight } = this.UserFormGroup.value;
    const userID = this.UTIL.generateUUID();
    const newUser: User = {
      id: userID,
      name,
      age,
      weight,
    };

    const newConnections: Connection[] = this.dynamicFriends$.value.map(
      (friend: User) => {
        return {
          connectionID: this.UTIL.generateUUID(),
          friends: [userID, friend.id],
        };
      }
    );
    this.STORE.dispatch(addUser({ user: newUser }));
    this.STORE.dispatch(addConnections({ connections: newConnections }));
    this.dialogRef.close();
  }

  updateUser() {
    //const updatedUser = {...this.formData.userData, ...this.UserFormGroup.value};
    // TODO: PUT request to update user
  }

  add(event: MatChipInputEvent): void {
    console.log('ADD', event.value);
    const value = event.value;

    // Add our friend
    if (value) {
      this.dynamicFriends$.next([value, ...this.dynamicFriends$.value]);
      this.UserFormGroup.patchValue({
        'friend-input': '',
      });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(targetFriend: User): void {
    const index = this.dynamicFriends$.value.indexOf(targetFriend);

    if (index >= 0) {
      const nextValue = this.dynamicFriends$.value.filter(
        (f: User) => f.id !== targetFriend.id
      );
      this.dynamicFriends$.next(nextValue);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.dynamicFriends$.next([
      event.option.value,
      ...this.dynamicFriends$.value,
    ]);
    this.UserFormGroup.patchValue({
      'friend-input': '',
    });
    // @ts-ignore
    this.friendInput.nativeElement.value = '';
  }

  friendOptionsMatchingText(
    options: User[],
    searchText: string | null
  ): User[] {
    if (
      !searchText ||
      typeof searchText !== 'string' ||
      (searchText && !searchText?.trim())
    ) {
      return options;
    }

    return options.filter((user: User) => {
      const singleStringName = user.name.toLowerCase().split(' ').join('');
      const singleStringQuery = searchText.toLowerCase().split(' ').join('');
      return singleStringName.includes(singleStringQuery);
    });
  }
}
