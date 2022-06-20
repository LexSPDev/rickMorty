import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Character } from 'src/app/models/characters.interface';
import { CharactersSevice } from 'src/app/services/characters.service';

@Component({
  selector: 'app-characters-details',
  templateUrl: './characters-details.component.html',
  styleUrls: ['./characters-details.component.scss']
})
export class CharactersDetailsComponent implements OnInit {
  character$: Observable<Character> = new Observable<Character>();
  
  constructor( private route:ActivatedRoute, 
              private characterService:CharactersSevice, 
              private location:Location  ) {
              }

  ngOnInit(): void {
   this.route.params.pipe( take ( 1 )).subscribe((params) => {
        const id = params['id'];
        this.character$ = this.characterService.getDetails(id)
    });
  }

  goBack(){
    this.location.back(); 
  }

}
