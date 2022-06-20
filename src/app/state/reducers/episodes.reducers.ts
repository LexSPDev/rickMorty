import { createReducer, on } from '@ngrx/store';
import { episodeState } from 'src/app/models/episodes.state';
import { loadedEpisodes, loadEpisodes } from '../actions/episodes.actions';

export const initialState:episodeState = { loading: false, episode:[]}

export const episodeReducer = createReducer(
  initialState,
  on(loadEpisodes, (state) => {
      return {...state, loading:true}
  }),
  on(loadedEpisodes, (state, {episode}) => {
    return {...state, loading:false, episode}
}),

);