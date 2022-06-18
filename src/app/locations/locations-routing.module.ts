import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsDetailsComponent } from './pages/locations-details/locations-details.component';
import { LocationsListComponent } from './pages/locations-list/locations-list.component';

const routes: Routes = [
  {
    path:'',
    children: [
      {path: 'list', component: LocationsListComponent},
      {path: 'details/:id', component: LocationsDetailsComponent},
      {path: '**', component: LocationsListComponent}
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class LocationsRoutingModule { }
