import { createSelector } from '@ngrx/store'
import { episodeState } from 'src/app/models/episodes.state';
import { AppState } from '../app.state'

export const selectEpisodeFeature = (state : AppState) => state.episodes;

export const selectListEpisodes = createSelector(
    selectEpisodeFeature,
    (state: episodeState) => state.episode
)

export const selectListInfoEpisodes = createSelector(
    selectEpisodeFeature,
    (state: episodeState) => state.info
)

export const selectLoadingEpisodes = createSelector(
    selectEpisodeFeature,
    (state: episodeState) => state.loading
)