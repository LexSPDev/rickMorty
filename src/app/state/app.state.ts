import { characterState } from '../models/characters.state';
import { ActionReducerMap } from '@ngrx/store'
import { characterReducer } from './reducers/characters.reducers';
import { navState } from '../models/nav.state';
import { navReducer } from './reducers/nav.reducers';
import { locationState } from '../models/locations.state';
import { locationReducer } from './reducers/locations.reducers';
import { episodeState } from '../models/episodes.state';
import { residentState } from '../models/residents.state';
import { episodeReducer } from './reducers/episodes.reducers';
import { residentReducer } from './reducers/residents.reducers';

export interface AppState {
  characters: characterState;
  nav: navState;
  episodes: episodeState;
  locations: locationState;
  residents: residentState;
}

export const ROOT_REDUCERS:ActionReducerMap<AppState> = { 
    characters: characterReducer,
    nav: navReducer,
    locations: locationReducer,
    episodes:episodeReducer,
    residents: residentReducer

}