import { Episode } from "./episodes.interface";

export interface episodeState {
    loading: boolean,
    info: Array<any>,
    episode: Array<Episode>;
} 