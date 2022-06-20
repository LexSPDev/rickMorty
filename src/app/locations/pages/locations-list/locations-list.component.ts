import { Component, OnInit } from '@angular/core';
import { take, filter }from 'rxjs/operators'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LocationInt, RequestInfo } from 'src/app/models/locations.interface';
import { LocationsService } from 'src/app/services/locations.service';
import { Store } from '@ngrx/store'
import { loadNav } from 'src/app/state/actions/nav.actions';
import { loadedLocations, loadLocations } from 'src/app/state/actions/locations.actions';
import { Observable } from 'rxjs';
import { selectLoadingEpisodes } from 'src/app/state/selectors/episode.selector';
import { selectListInfoLocations, selectListLocation, selectLoadingLocations } from 'src/app/state/selectors/location.selector';
@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss']
})
export class LocationsListComponent implements OnInit {
  loading$ : Observable<boolean> = new Observable();
  location$: Observable<LocationInt[]> = new Observable();
  info$: Observable<any> = new Observable();
  info: RequestInfo = {
      next: '',
    }
  private pageNum = 1;
  private query = '';
  private hideScrollHeight= 200;
  private sowScrollHeight = 500;
  constructor( private locationService: LocationsService,
    private route:ActivatedRoute,
    private router: Router,
    private store:Store<any>) { 
      this.store.dispatch(loadLocations())
      this.onUrlChanged();
    }

  ngOnInit(): void {
    this.getCharacterSearch();
    this.loading$ = this.store.select(selectLoadingLocations)
    this.location$ = this.store.select(selectListLocation)
    this.store.dispatch(loadNav({ nav: 'locations' }))
  }
  private onUrlChanged(){
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.pageNum = 1;        
        this.getCharacterSearch();
      })
  }

  private getCharacterSearch():void{
    this.route.queryParams.pipe(take(1))
      .subscribe( (params) => {
        console.log(params)
      this.query = params['q'];
      this.getDataFromService();
    })

  }
  private getDataFromService():void{
    this.locationService.loadLocations(this.query, this.pageNum)
      .pipe( take (1))
      .subscribe ( ( res: any ) => {
        if(res?.results?.length){
          const { info, results } = res;
          this.info = info
          this.store.dispatch(loadedLocations({
            location : results,
            info: info,
          }))
        }
      })
  }
  changePage(value:string){
    let rutaNext: string;
    let rutaPrev: string;
    this.info$ = this.store.select(selectListInfoLocations)
    this.info$.pipe(take(1)).subscribe((res)=>{    
      rutaNext = res.next;
      rutaPrev = res.prev;
      if(rutaNext !== null && value === 'next' ){
        this.pageNum++;
        this.getDataFromService();
        } else if(rutaPrev !== null && value === 'previous'){
          this.pageNum--;
          this.getDataFromService();
      }
    });
}

}
