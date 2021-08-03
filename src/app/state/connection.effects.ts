import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';
import { RequestService } from '../services/request.service';

@Injectable()
export class ConnectionEffects {
  loadConnections$ = createEffect(() =>
    this.actions$.pipe(
      ofType('Load Connections'),
      mergeMap(() =>
        this.REQUEST.getAllConnections().pipe(
          map((connections) => ({
            type: 'Connections Loaded Success',
            connections,
          })),
          catchError(() => {
            this.SNACK.showSnackbar(
              'Error fetching data. Confirm you used `npm start` and NOT `ng serve` to run this application. `npm start` enables json-server to run in the background as a fake API.'
            );
            return of({ type: 'Connections Loaded Error' });
          })
        )
      )
    )
  );
  addConnections$ = createEffect(() =>
    this.actions$.pipe(
      ofType('Add Connections'),
      mergeMap((action: any) =>
        this.REQUEST.createNewConnections(action.connections).pipe(
          map((connection) => ({
            type: 'Add Connection Success',
            connection,
          })),
          catchError(() => of({ type: 'Add Connections Error' }))
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
