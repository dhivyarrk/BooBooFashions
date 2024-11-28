import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from './env';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpClient) { }

  //this.http.get(`${API_URL}`).subscribe(j => console.log(j))
  // GET list of public, future events
  getUsers(): Observable<User> {
    console.log("*****");
    this.http.get(`${API_URL}`).subscribe(j => console.log(j));
    //console.log(this.http.get<User>(`${API_URL}`));
    return this.http.get<User>(`${API_URL}`);
    //return this.http.get<any>(this.apiUrl);
    //return j;
  }



}
