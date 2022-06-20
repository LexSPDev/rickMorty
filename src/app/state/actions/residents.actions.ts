import { createAction, props } from '@ngrx/store';
import { Character } from 'src/app/models/characters.interface';

export const loadResidents = createAction(
    '[resident list] Load Residents'
)

export const loadedResidents = createAction(
    '[resident list] Loaded success', 
    props<{ resident: Character[]}>()
)