
import { createAction, props } from '@ngrx/store';
import { LocationInt } from 'src/app/models/locations.interface';


export const loadLocations = createAction(
    '[location list] Load Locations'
)

export const loadedLocations = createAction(
    '[location list] Loaded success', 
    props<{ location: LocationInt[], info: any[] }>()
)