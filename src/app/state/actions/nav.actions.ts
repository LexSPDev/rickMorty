import { createAction, props } from '@ngrx/store';

export const loadNav = createAction(
    '[nav App] nav', 
    props<{nav:string}>()
)
