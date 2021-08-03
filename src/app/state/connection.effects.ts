import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
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
          catchError(() => of({ type: 'Connections Loaded Error' }))
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

  constructor(private actions$: Actions, private REQUEST: RequestService) {}
}
