import { Component, OnInit } from '@angular/core';
import { take, filter }from 'rxjs/operators'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Episode, RequestInfo } from 'src/app/models/episodes.interface';
import { EpisodesService } from 'src/app/services/episodes.service';
@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.scss']
})
export class EpisodesListComponent implements OnInit {
  episodes: Episode[] = [];
  info: RequestInfo = {
      next: '',
    }
  private pageNum = 1;
  private query = '';
  private hideScrollHeight= 200;
  private sowScrollHeight = 500;
  constructor(private episodeService: EpisodesService,
    private route:ActivatedRoute,
    private router: Router) { this.onUrlChanged()}

  ngOnInit(): void {
    this.getDataFromService();
  }

  private onUrlChanged(){
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.episodes = [];
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
          this.episodes = [];
          const { info, results } = res;
          this.episodes = [...this.episodes, ...results]
          this.info = info
        } else {
          this.episodes = []
        }
      });
  }

}
