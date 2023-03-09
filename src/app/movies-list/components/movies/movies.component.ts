import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { fadeIn, ScaleIn } from 'src/app/shared/animations';
import { environment } from 'src/environments/environment';
import { MovieListOutput } from '../../model/movieList';
import { MovieListService } from '../../services/movie-list.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  animations: [fadeIn , ScaleIn],
})
export class MoviesComponent {
  private movieListService = inject(MovieListService);
  private dialog = inject(MatDialog);
  pagedata = [];
  movieList$!: Observable<any>;
  avatarUrl: string = environment.avatarUrl;
  search!: string;
  searchControl = new FormControl();
  error: boolean = false;
  totalCount!: number;
  pageIndex!: number;
  ngOnInit(): void {
    this.getCurrentPageList();
    this.initializeSearch();
  }
  // for getting movies List of current page
  getCurrentPageList(pageIndex?: number) {
    this.movieList$ = this.movieListService.getMovieList(this.pageIndex).pipe(
      catchError((error) => {
        console.log(error, 'Error loged');
        this.error = true;
        this.movieList$ = of();
        return this.movieList$;
      }),
      map((data: MovieListOutput) => {
        if (data.results) this.error = false;
        this.totalCount = data.count;
        return data.results;
      })
    );
  }

  // if search string is less than 3 show the full current page data
  condtionalSearch(value: string) {
    if (value.length >= 3) {
      return true;
    } else {
      this.getCurrentPageList();
      return false;
    }
  }

  //initialize the search observable which listens to valuechanges of formcontrol
  initializeSearch() {
    this.searchControl.valueChanges
      .pipe(
        // filter(searchTerm => (searchTerm.length > 3)),
        //for adding delay of 250ms whenver the value changes
        debounceTime(250),
        distinctUntilChanged(),
        // tap((searchedValue) => {
        //   return this.condtionalSearch(searchedValue);
        // })
      )
      .subscribe((searchResults: string) => {
        console.log(searchResults)
        //before searching initializing the current page data to search inside it
        this.getCurrentPageList();
        this.movieList$ = this.movieList$.pipe(
          switchMap((movieList) => {
            let searchResult: any[] = [];
            let obj: Array<object> = movieList;
            if (movieList.length > 0) {
              obj.filter((movie) => {
                const string = JSON.stringify(movie).toLowerCase();
                if (string.toLowerCase().includes(searchResults))
                  searchResult.push(movie);
              });
            }else{
              console.log('do nothing')
            }
            return of(searchResult);
          })
        );
      });
  }
  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex + 1;
    this.getCurrentPageList(this.pageIndex);
  }

  OpenDialog(template: any, config?: any): MatDialogRef<any> {
    return this.dialog.open(template, config);
  }

  openDailogueMovieCard(movieCard: TemplateRef<NgTemplateOutlet> , movieData:object) {
    const dialogueRef = this.OpenDialog( movieCard, {
      data:movieData,
      panelClass: 'movieFullDetails',
      disableClose: false,
    });
  }
  closeDialogue(){
    this.dialog.closeAll()
  }
}
