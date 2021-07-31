import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]> = this.STORE.pipe(select('users'));
  constructor(private STORE: Store<{users: User[]}>) {}

  ngOnInit(): void {
    this.users$.subscribe(console.log)
  }

}
