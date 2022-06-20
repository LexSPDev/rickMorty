import { createSelector } from '@ngrx/store'
import { locationState } from 'src/app/models/locations.state';
import { AppState } from '../app.state'

export const selectLocationFeature = (state : AppState) => state.locations;

export const selectListLocation = createSelector(
    selectLocationFeature,
    (state: locationState) => state.location
)

export const selectListInfoLocations = createSelector(
    selectLocationFeature,
    (state: locationState) => state.info
)

export const selectLoadingLocations = createSelector(
    selectLocationFeature,
    (state: locationState) => state.loading
)