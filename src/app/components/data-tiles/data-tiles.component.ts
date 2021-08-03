import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Connection } from 'src/app/models/Connection.model';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-data-tiles',
  templateUrl: './data-tiles.component.html',
  styleUrls: ['./data-tiles.component.scss']
})
export class DataTilesComponent implements OnInit {
  users$: Observable<User[]> = this.STORE.pipe(select('users'));
  connections$: Observable<Connection[]> = this.STORE.pipe(
    select('connections')
  );
  totalFriendsCount$ = this.users$.pipe(map(users => users.length))
  totalConnectionsCount$ = this.connections$.pipe(map(connections => connections.length))
  average$ = this.users$.pipe(map(users => {
    const count = users.length;
    let totalAge = 0;
    let totalWeight = 0;
    for(let u of users){
      totalAge += u.age;
      totalWeight += u.weight;
    }
    return {
      age: Math.round(totalAge / count) || 0,
      weight: Math.round(totalWeight / count) || 0,
    }
  }))
  constructor(
    private STORE: Store<any>
  ) { }

  ngOnInit(): void {
  }

}
