import { createReducer, on, Action } from '@ngrx/store';

import { addUser, removeUser, loadUsersSuccess } from './users.actions';
import { User } from '../models/User.model';

export const initialState: ReadonlyArray<User> = [];

export const usersReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => {
    return [...users]
  }),
  on(addUser, (state, { user }) => [user, ...state]),
  on(removeUser, (state, { userID }) => state.filter(user => user.id !== userID)),
);