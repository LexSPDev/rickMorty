import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { loadNav } from '../state/actions/nav.actions';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store:Store<any>) { }

  ngOnInit(): void {
    this.store.dispatch(loadNav({ nav: 'home' }))
  }

}
