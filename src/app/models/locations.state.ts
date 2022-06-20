import { LocationInt } from "./locations.interface";

export interface locationState {
    loading: boolean,
    info:Array<any>;
    location: Array<LocationInt>;
} 