import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { pluck, take } from "rxjs";
import { environment } from "src/environments/environment";
import { LocationInt } from "../models/locations.interface";

@Injectable({
    providedIn: 'root'
})

export class LocationsService{

    constructor( private http: HttpClient ){}

    
    loadLocations(query = '', page = 1){
        return this.http.get<LocationInt>( `${environment.baseUrl}/location/?name=${query}&page=${page}`)
    }

    getDetails(id: number){
        return this.http.get<LocationInt>( `${environment.baseUrl}/location/${id}`)
    }

    getResidents(id: number){
        return this.http.get<LocationInt>( `${environment.baseUrl}/location/${id}`).pipe(pluck('residents'))
    }

    getResident(url:string){
        return this.http.get<LocationInt>( `${url}` )
    }
}