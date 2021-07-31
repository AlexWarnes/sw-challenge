import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { RequestService } from '../services/request.service';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[App] Load Users'),
      mergeMap(() =>
        this.REQUEST.getAllUsers().pipe(
          map((users) => ({
            type: '[API] Users Loaded Success',
            users,
          })),
          catchError(() => of({ type: '[API] Users Loaded Error' }))
        )
      )
    )
  );
  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Add User Form] Add User'),
      mergeMap((action: any) =>
        this.REQUEST.createNewUser(action.user).pipe(
          map((user) => ({
            type: '[API] Add User Success',
            user,
          })),
          catchError(() => of({ type: '[API] Add User Error' }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private REQUEST: RequestService) {}
}
