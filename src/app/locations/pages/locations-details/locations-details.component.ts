import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, pluck, take } from 'rxjs';
import { LocationInt } from 'src/app/models/locations.interface';
import { LocationsService } from 'src/app/services/locations.service';
@Component({
  selector: 'app-locations-details',
  templateUrl: './locations-details.component.html',
  styleUrls: ['./locations-details.component.scss']
})
export class LocationsDetailsComponent implements OnInit {
  location$: Observable<LocationInt> = new Observable<LocationInt>();
  residents: any;
  arregloResident: Array<string> = [];
  constructor(private route:ActivatedRoute, 
    private locationService:LocationsService, 
    private location:Location ) { }

   ngOnInit(): void {
    this.route.params.pipe( take ( 1 )).subscribe((params) => {
      const id = params['id'];
      this.location$ = this.locationService.getDetails(id)
      this.location$.pipe(pluck('residents')).subscribe((res) =>{
        this.residents = res;
        console.log(this.residents)
        for(let item of this.residents){
          this.locationService.getResident(item).pipe(take(1)).subscribe((res)=>{
            console.log(res.name)
            this.arregloResident.push(res.name)
          })
        }
      })
    });
  }
  goBack(){
    this.location.back(); 
  }
}
