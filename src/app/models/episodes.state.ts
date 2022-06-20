import { Episode } from "./episodes.interface";

export interface episodeState {
    loading: boolean,
    episode: Array<Episode>;
} 