import { createReducer, on } from '@ngrx/store';

import {
  addConnections,
  addConnectionSuccess,
  addConnectionsError,
  removeConnections,
  loadConnectionsSuccess,
  loadUsersError,
} from './connection.actions';
import { Connection } from '../models/Connection.model';

export const initialState: ReadonlyArray<Connection> = [];

export const connectionReducer = createReducer(
  initialState,
  on(loadConnectionsSuccess, (state, { connections }) => {
    return [...connections];
  }),

  on(addConnectionSuccess, (state, { connection }) => [connection, ...state]),
  on(removeConnections, (state, { connectionIDs }) =>
    state.filter((connection) => !connectionIDs.includes(connection.connectionID))
  )
);
