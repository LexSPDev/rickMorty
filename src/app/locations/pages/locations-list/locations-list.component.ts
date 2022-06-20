import { Component, OnInit } from '@angular/core';
import { take, filter }from 'rxjs/operators'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LocationInt, RequestInfo } from 'src/app/models/locations.interface';
import { LocationsService } from 'src/app/services/locations.service';
import { Store } from '@ngrx/store'
import { loadNav } from 'src/app/state/actions/nav.actions';
@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss']
})
export class LocationsListComponent implements OnInit {
  locations: LocationInt[] = [];
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
      this.onUrlChanged();
    }

  ngOnInit(): void {
    this.getCharacterSearch();
    this.store.dispatch(loadNav({ nav: 'locations' }))
  }
  private onUrlChanged(){
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.locations = [];
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
          this.locations = [];
          const { info, results } = res;
          this.locations = [...this.locations, ...results]
          this.info = info
        } else {
          this.locations = []
        }
      } )
  }

}
