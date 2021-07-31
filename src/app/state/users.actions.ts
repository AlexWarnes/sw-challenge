import { createAction, props } from '@ngrx/store';
import { User } from '../models/User.model';

export const addUser = createAction(
  '[Add User Form] Add User',
  props<{ user: User }>()
);
export const addUserSuccess = createAction(
  '[API] Add User Success',
  props<{ user: User }>()
);
export const addUserError = createAction(
  '[API] Add User Error',
  props<any>()
);

export const removeUser = createAction(
  '[Admin Bar] Remove User',
  props<{ userID: string }>()
);

export const loadUsersSuccess = createAction(
  '[API] Users Loaded Success',
  props<{ users: User[] }>()
);

export const loadUsersError = createAction(
  '[API] Users Loaded Error',
  props<any>()
);

