import { createReducer, on } from '@ngrx/store';
import { characterState } from 'src/app/models/characters.state';
import { loadCharacters, loadedCharacters } from '../actions/characters.actions';

export const initialState:characterState = { loading: false, character:[], info:[]}

export const characterReducer = createReducer(
  initialState,
  on(loadCharacters, (state) => {
      return {...state, loading:true}
  }),
  on(loadedCharacters, (state, {character, info}) => {
    return {...state, loading:false, character , info}
}),

);