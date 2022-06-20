import { Character } from "./characters.interface";

export interface characterState {
    loading: boolean,
    info: Array<any>,
    character: Array<Character>;
} 