import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginInput, LoginOutput } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);

  authenticate(loginDetails : LoginInput):Observable<LoginOutput>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
   };
    return this.http.post<LoginOutput>(`${environment.loginUrl}`,loginDetails , httpOptions);
  }
}
