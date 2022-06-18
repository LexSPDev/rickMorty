import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodesDetailsComponent } from './pages/episodes-details/episodes-details.component';
import { EpisodesListComponent } from './pages/episodes-list/episodes-list.component';
import { EpisodesRoutingModule } from './episodes-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    EpisodesDetailsComponent,
    EpisodesListComponent
  ],
  imports: [
    CommonModule,
    EpisodesRoutingModule,
    HttpClientModule,
    RouterModule,
  ]
})
export class EpisodesModule { }
