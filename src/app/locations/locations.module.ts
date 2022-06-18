import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsDetailsComponent } from './pages/locations-details/locations-details.component';
import { LocationsListComponent } from './pages/locations-list/locations-list.component';
import { LocationsRoutingModule } from './locations-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    LocationsDetailsComponent,
    LocationsListComponent
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    HttpClientModule,
    RouterModule,
  ]
})
export class LocationsModule { }
