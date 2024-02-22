

import { createReducer, on } from '@ngrx/store';
import * as AppActions from './profile.actions'
import { AppState } from '../app.state';
export const initialState: AppState = {
  profileVisible: true,
};

export const profileReducer = createReducer(
  initialState,
  on(AppActions.toggleProfile, (state) => ({ ...state, profileVisible: !state.profileVisible })),
);
