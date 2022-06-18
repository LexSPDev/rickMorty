import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Character } from "../models/characters.interface";

@Injectable({
    providedIn: 'root'
})

export class CharactersSevice{

    constructor( private http: HttpClient ){}

    
    loadCharacters(query = '', page = 1){
        return this.http.get<Character>( `${environment.baseUrl}/character/?name=${query}&page=${page}`)
    }

    getDetails(id: number){
        return this.http.get<Character>( `${environment.baseUrl}/character/${id}`)
    }
}