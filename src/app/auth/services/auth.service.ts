import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/* Environment */
/* RxJs */
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public url: string = environment.api + '/user/';
  constructor(private _http: HttpClient) {}
  login(user: {
    email: string;
    password: string;
    gettoken?: boolean;
  }): Observable<any> {
    return this._http.post<any>(`${this.url}login`, user);
  }
}
