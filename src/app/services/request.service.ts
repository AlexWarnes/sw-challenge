import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, from, Observable, of } from 'rxjs';
import { User } from '../models/User.model';
import { Connection } from '../models/Connection.model';
import { concatMap, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  BASE_API_URL: string = 'http://localhost:3000';
  constructor(private HTTP: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.HTTP.get(`${this.BASE_API_URL}/users`);
  }
  getAllConnections(): Observable<any> {
    return this.HTTP.get(`${this.BASE_API_URL}/connections`);
  }
  createNewUser(newUser: User): Observable<any> {
    return this.HTTP.post(`${this.BASE_API_URL}/users`, newUser);
  }
  createNewConnections(connections: Connection[]): Observable<any> {
    return from(connections).pipe(
      concatMap((connection) => {
        return this.HTTP.post(`${this.BASE_API_URL}/connections`, connection);
      })
    );
  }
}
