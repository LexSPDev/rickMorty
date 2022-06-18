import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersDetailsComponent } from './pages/characters-details/characters-details.component';
import { CharactersListComponent } from './pages/characters-list/characters-list.component';

const routes: Routes = [
  {
    path:'',
    children: [
      {path: 'list', component: CharactersListComponent},
      {path: 'details/:id', component: CharactersDetailsComponent},
      {path: '**', component: CharactersListComponent}
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class CharactersRoutingModule { }
