import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesListRoutingModule } from './movies-list-routing.module';
import { MoviesComponent } from './components/movies/movies.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MoviesComponent
  ],
  imports: [
    CommonModule,
    MoviesListRoutingModule,
    SharedModule
  ]
})
export class MoviesListModule { }
