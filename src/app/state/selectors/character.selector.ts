import { createSelector } from '@ngrx/store'
import { characterState } from 'src/app/models/characters.state';
import { AppState } from '../app.state'

export const selectCharacterFeature = (state : AppState) => state.characters;

export const selectListCharacters = createSelector(
    selectCharacterFeature,
    (state: characterState) => state.character
)

export const selectListInfo = createSelector(
    selectCharacterFeature,
    (state: characterState) => state.info
)

export const selectLoadingCharacters = createSelector(
    selectCharacterFeature,
    (state: characterState) => state.loading
)