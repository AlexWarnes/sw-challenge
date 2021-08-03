import { createAction, props } from '@ngrx/store';
import { Connection } from '../models/Connection.model';

export const addConnections = createAction(
  'Add Connections',
  props<{ connections: Connection[] }>()
);
export const addConnectionSuccess = createAction(
  'Add Connection Success',
  props<{ connection: Connection }>()
);
export const addConnectionsError = createAction(
  'Add Connections Error',
  props<any>()
);

export const removeConnections = createAction(
  'Remove Connections',
  props<{ connectionIDs: string[] }>()
);

export const loadConnectionsSuccess = createAction(
  'Connections Loaded Success',
  props<{ connections: Connection[] }>()
);

export const loadUsersError = createAction(
  'Connections Loaded Error',
  props<any>()
);

