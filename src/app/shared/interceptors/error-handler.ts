import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, retry, takeUntil, throwError, timeout, timer } from 'rxjs';

@Injectable()
export class ErrorHandler implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      timeout(5000),
      catchError((error: HttpErrorResponse) => {
        console.log('An error occurred:', error);
        return throwError(()=>error.error);
      }),
       // cancel the request if it takes longer than 5 seconds
      finalize(() => {
        console.log('Request complete');
      })
    );
  }
}
// intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//   return next.handle(request)
//     .pipe(
//       (errors => errors.pipe(
//         delay(1000),
//         take(3),
//         catchError((error: HttpErrorResponse) => {
//           if (error.status !== 500) {
//             return throwError(()=>error);
//           }
//           return throwError(()=>'Server error');
//         })
//       ))
//     );
// }
