import {createSelector } from '@ngrx/store'
import { characterState } from 'src/app/models/characters.state';
import { navState } from 'src/app/models/nav.state';
import { AppState } from '../app.state'

export const selectNavFeature = (state : AppState) => state.nav;

export const selectNav = createSelector(
    selectNavFeature,
    (state: navState) => state.nav
)