import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, pluck, take } from 'rxjs';
import { Episode } from 'src/app/models/episodes.interface';
import { EpisodesService } from 'src/app/services/episodes.service';

@Component({
  selector: 'app-episodes-details',
  templateUrl: './episodes-details.component.html',
  styleUrls: ['./episodes-details.component.scss']
})
export class EpisodesDetailsComponent implements OnInit {
  episode$: Observable<Episode> = new Observable<Episode>();
  residents: any;
  arregloResident: Array<string> = [];
  constructor( private route:ActivatedRoute, 
    private episodeService:EpisodesService,
    private location:Location ) { }

  ngOnInit(): void {
    this.route.params.pipe( take ( 1 )).subscribe((params) => {
      const id = params['id'];
      this.episode$ = this.episodeService.getDetails(id)
      this.episode$.pipe(pluck('characters')).subscribe((res) =>{
        this.residents = res;
        console.log(this.residents)
        for(let item of this.residents){
          this.episodeService.getResident(item).pipe(take(1)).subscribe((res)=>{
            console.log(res.name)
            this.arregloResident.push(res.name)
          })
        }
      })
  });
  console.log(this.episode$)
  }
  goBack(){
    this.location.back(); 
  }
}
