import { createReducer, on } from '@ngrx/store';
import { locationState } from 'src/app/models/locations.state';
import { loadedLocations, loadLocations } from '../actions/locations.actions';


export const initialState:locationState = { loading: false, location:[]}

export const locationReducer = createReducer(
    initialState,
    on(loadLocations, (state) => {
        return {...state, loading:true}
    }),
    on(loadedLocations, (state, {location}) => {
      return {...state, loading:false, location}
  }),
);