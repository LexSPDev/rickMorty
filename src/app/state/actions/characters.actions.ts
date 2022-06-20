import { createAction, props } from '@ngrx/store';
import { Character } from 'src/app/models/characters.interface';

export const loadCharacters = createAction(
    '[character list] Load Characters'
)

export const loadedCharacters = createAction(
    '[character list] Loaded success', 
    props<{ character: Character[], info: any[]}>()
)