import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersListComponent } from './pages/characters-list/characters-list.component';
import { CharactersDetailsComponent } from './pages/characters-details/characters-details.component';
import { CharactersRoutingModule } from './characters-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
// import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    CharactersListComponent,
    CharactersDetailsComponent
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    HttpClientModule,
    RouterModule,
    
  ]
})
export class CharactersModule { }
