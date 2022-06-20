import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store'
import { selectNav } from 'src/app/state/selectors/nav.selector';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  nav$: Observable<any> = new Observable();
  constructor(private router: Router, private location: Location,
    private store:Store<any>) { }

  ngOnInit(): void {
    
  }

  search(value: string){
    let ruta: string;
    this.nav$ = this.store.select(selectNav)
    this.nav$.pipe(take(1)).subscribe((res)=>{
      ruta = res
    
      if(ruta !== 'home' && value && value.length > 3 ){
        this.router.navigate([`/${ruta}`], {
          queryParams: { q: value }
        })
      }
    })
  }
}
