import { Component, OnInit } from '@angular/core';
import { Character, RequestInfo } from 'src/app/models/characters.interface';
import { CharactersSevice } from 'src/app/services/characters.service';
import {loadCharacters, loadedCharacters} from '../../../state/actions/characters.actions'
import { take, filter }from 'rxjs/operators'

import { Store } from '@ngrx/store'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, mergeAll } from 'rxjs';
import { selectListCharacters, selectListInfo, selectLoadingCharacters } from 'src/app/state/selectors/character.selector';
import { loadNav } from 'src/app/state/actions/nav.actions';
@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {
  loading$ : Observable<boolean> = new Observable();
  characters$: Observable<Character[]> = new Observable();
  info$: Observable<any> = new Observable();
  info: RequestInfo = {
      next: '',
    }
  private pageNum = 1;
  private query = '';

  constructor( private charactersService: CharactersSevice,
    private route:ActivatedRoute,
    private router: Router,
    private store:Store<any>) {
      this.store.dispatch(loadCharacters())
      this.onUrlChanged();
     }

  ngOnInit(): any {
    this.loading$ = this.store.select(selectLoadingCharacters)
    this.characters$ = this.store.select(selectListCharacters)
    this.store.dispatch(loadNav({ nav: 'characters' }))
    this.getCharacterSearch();
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
    this.charactersService.loadCharacters(this.query, this.pageNum)
      .pipe( take (2))
      .subscribe ( ( res: any ) => {
        if(res?.results?.length){
            const { info, results } = res;
            this.info = info;
            this.store.dispatch(loadedCharacters({
              info: info,
              character : results
            }))
        }
      })
  }
  changePage(value:string){
    let rutaNext: string;
    let rutaPrev: string;
    this.info$ = this.store.select(selectListInfo)
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
