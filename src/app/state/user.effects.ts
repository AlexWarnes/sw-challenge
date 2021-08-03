import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';
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
          catchError(() => {
            this.SNACK.showSnackbar('Error fetching data. Confirm you used `npm start` and NOT `ng serve` to run this application. `npm start` enables json-server to run in the background as a fake API.');
            return of({ type: '[API] Users Loaded Error' });
          })
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

  constructor(
    private actions$: Actions,
    private REQUEST: RequestService,
    private SNACK: NotificationService
  ) {}
}
