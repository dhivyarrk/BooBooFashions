import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {API_URL} from './env';
import { User } from './models/user.model'; // Import User model


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  signup(user: User): Observable<any> {
    console.log("user is", user);
    return this.http.post(`${API_URL}/signup`, user);
  }

  signin(credentials: { email_id: string; password: string }): Observable<any> {
    return this.http.post(`${API_URL}/signin`, credentials);
  }

  getProtectedResource() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${API_URL}/protected`, { headers });
  }
}

