import { createReducer, on } from '@ngrx/store';
import { navState } from 'src/app/models/nav.state';
import { loadNav } from '../actions/nav.actions';

export const initialState:navState = { nav: '',}

export const navReducer = createReducer(
  initialState,
  on(loadNav, (state, {nav}) => {
      return {...state, nav}
  }),
);