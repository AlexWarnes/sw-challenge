import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, forkJoin, from, Observable, of } from 'rxjs';
import { switchMap, filter, mergeMap, map, concatMap } from 'rxjs/operators';
import { Connection } from 'src/app/models/Connection.model';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit {
  userData$: Observable<User | undefined> = this.ACT_ROUTE.paramMap.pipe(
    filter((params) => !!params && !!params.get('userID')),
    switchMap((params) => {
      const userID: string | null = params.get('userID');
      return this.USER.userDetailsByID(userID);
    })
  );

  userConnections$: Observable<any> =
    this.userData$.pipe(
      filter(user => !!user),
      switchMap((user) => {
        return this.USER.connectionsByUserID(user?.id);
      })
    )
  constructor(
    private ACT_ROUTE: ActivatedRoute,
    private ROUTER: Router,
    private USER: UserService
  ) {}

  ngOnInit(): void {
    this.userConnections$.subscribe(data => console.log("boom", data))
  }
}
