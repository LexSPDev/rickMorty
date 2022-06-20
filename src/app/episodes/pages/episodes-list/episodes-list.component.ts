import { Component, OnInit } from '@angular/core';
import { take, filter }from 'rxjs/operators'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Episode, RequestInfo } from 'src/app/models/episodes.interface';
import { EpisodesService } from 'src/app/services/episodes.service';
import { Store } from '@ngrx/store'
import { loadNav } from 'src/app/state/actions/nav.actions';
import { Observable } from 'rxjs';
import { loadedEpisodes, loadEpisodes } from 'src/app/state/actions/episodes.actions';
import { selectListEpisodes, selectListInfoEpisodes, selectLoadingEpisodes } from 'src/app/state/selectors/episode.selector';
@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.scss']
})
export class EpisodesListComponent implements OnInit {
  loading$ : Observable<boolean> = new Observable();
  episode$: Observable<Episode[]> = new Observable();
  info$: Observable<any> = new Observable();
  info: RequestInfo = {
      next: '',
    }
  private pageNum = 1;
  private query = '';
  constructor(private episodeService: EpisodesService,
    private route:ActivatedRoute,
    private router: Router,
    private store:Store<any>) { 
      this.store.dispatch(loadEpisodes())
      this.onUrlChanged()
    }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoadingEpisodes)
    this.episode$ = this.store.select(selectListEpisodes)
    this.getDataFromService();
    this.store.dispatch(loadNav({ nav: 'episodes' }))
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
      this.query = params['q'];
      this.getDataFromService();
    })

  }
  private getDataFromService():void{
    this.episodeService.loadEpisodes(this.query, this.pageNum)
      .pipe( take (1))
      .subscribe ( ( res: any ) => {
        if(res?.results?.length){
          const { info, results } = res;
          this.info = info
          this.store.dispatch(loadedEpisodes({
            info: info,
            episode : results
          }))
        } 
      });
  }
  changePage(value:string){
    let rutaNext: string;
    let rutaPrev: string;
    this.info$ = this.store.select(selectListInfoEpisodes)
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
