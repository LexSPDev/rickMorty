import { createAction, props } from '@ngrx/store';
import { Episode } from 'src/app/models/episodes.interface';

export const loadEpisodes = createAction(
    '[episode list] Load Episodes'
)

export const loadedEpisodes = createAction(
    '[episode list] Loaded success', 
    props<{ episode: Episode[] }>()
)