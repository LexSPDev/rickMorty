import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodesListComponent } from './pages/episodes-list/episodes-list.component';
import { EpisodesDetailsComponent } from './pages/episodes-details/episodes-details.component';

const routes: Routes = [
  {
    path:'',
    children: [
      {path: 'list', component: EpisodesListComponent},
      {path: 'details/:id', component: EpisodesDetailsComponent},
      {path: '**', component: EpisodesListComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class EpisodesRoutingModule { }
