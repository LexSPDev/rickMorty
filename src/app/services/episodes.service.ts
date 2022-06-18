import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { pluck } from "rxjs";
import { environment } from "src/environments/environment";
import { Episode } from "../models/episodes.interface";

@Injectable({
    providedIn: 'root'
})

export class EpisodesService{

    constructor( private http: HttpClient ){}

    
    loadEpisodes(query = '', page = 1){
        return this.http.get<Episode>( `${environment.baseUrl}/episode/?name=${query}&page=${page}`)
    }

    getDetails(id: number){
        return this.http.get<Episode>( `${environment.baseUrl}/episode/${id}`)
    }
    getResidents(id: number){
        return this.http.get<Episode>( `${environment.baseUrl}/location/${id}`).pipe(pluck('residents'))
    }

    getResident(url:string){
        return this.http.get<Episode>( `${url}` )
    }
}