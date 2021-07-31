import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  BASE_API_URL: string = 'http://localhost:3000';
  constructor(private HTTP: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.HTTP.get(`${this.BASE_API_URL}/users`);
  }
  createNewUser(newUser: User): Observable<any> {
    return this.HTTP.post(`${this.BASE_API_URL}/users`, newUser);
  }
}
