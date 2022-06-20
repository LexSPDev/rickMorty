import { createReducer, on } from '@ngrx/store';
import { characterState } from 'src/app/models/characters.state';
import { residentState } from 'src/app/models/residents.state';
import { loadedResidents, loadResidents } from '../actions/residents.actions';

export const initialState:residentState = { loading: false, resident:[],}

export const residentReducer = createReducer(
  initialState,
  on(loadResidents, (state) => {
      return {...state, loading:true}
  }),
  on(loadedResidents, (state, {resident}) => {
    return {...state, loading:false, resident}
}),

);