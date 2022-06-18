import { Component, OnInit } from '@angular/core';
import { Character, RequestInfo } from 'src/app/models/characters.interface';
import { CharactersSevice } from 'src/app/services/characters.service';
import { take, filter }from 'rxjs/operators'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {
  characters: Character[] = [];
  info: RequestInfo = {
      next: '',
    }
  private pageNum = 1;
  private query = '';
  private hideScrollHeight= 200;
  private sowScrollHeight = 500;

  constructor( private charactersService: CharactersSevice,
    private route:ActivatedRoute,
    private router: Router) {
      this.onUrlChanged();
     }

  ngOnInit(): any {
    this.getCharacterSearch();
  }

  private onUrlChanged(){
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.characters = [];
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
    this.charactersService.loadCharacters(this.query, this.pageNum)
      .pipe( take (1))
      .subscribe ( ( res: any ) => {
        if(res?.results?.length){
          this.characters = [];
          const { info, results } = res;
          this.characters = [...this.characters, ...results]
          this.info = info
        } else {
          this.characters = []
        }
      } )
  }

}
