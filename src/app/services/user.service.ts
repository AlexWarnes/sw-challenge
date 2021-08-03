import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { Connection } from '../models/Connection.model';
import { User } from '../models/User.model';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  connections$ = this.STORE.select('connections').pipe(
    filter((connections) => !!connections)
  );
  users$ = this.STORE.select('users').pipe(filter((users) => !!users));
  constructor(
    private UTIL: UtilService,
    private STORE: Store<{ users: User[]; connections: Connection[] }>
  ) {}

  connectionsByUserID(
    userID: string | undefined
  ): Observable<{ focusUserID: string; connections: Connection[] }> {
    return this.connections$.pipe(
      map((connections) => {
        return {
          focusUserID: userID || '',
          connections: connections.filter((c) =>
            c.friends.includes(userID || '')
          ),
        };
      })
    );
  }

  userDetailsByID(userID: string | null): Observable<User | undefined> {
    return this.users$.pipe(map((users) => users.find((u) => u.id === userID)));
  }

}
