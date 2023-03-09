import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieListOutput } from '../model/movieList';

@Injectable({
  providedIn: 'root',
})
export class MovieListService {
  private http = inject(HttpClient);  
  getMovieList(pageNo?:number): Observable<MovieListOutput> {
    let page : number
    pageNo ? page = pageNo : page = 1;
    return this.http.get<MovieListOutput>(
      `${environment.movieListUrl}?page=${page}`,
    );
  }
}
