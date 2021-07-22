import { createAction, props } from '@ngrx/store';
import { User } from '../models/User.model';

export const addUser = createAction(
  '[Users Collection] Add User',
  props<{ user: User }>()
);

export const removeUser = createAction(
  '[User Collection] Remove User',
  props<{ userID: string }>()
);

export const retrievedAllUsers = createAction(
  '[User Collection/API] Retrieve Users Success',
  props<{ users: User[] }>()
);