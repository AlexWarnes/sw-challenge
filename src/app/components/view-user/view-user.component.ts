import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
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

  userConnections$: Observable<any> = this.userData$.pipe(
    filter((user) => !!user),
    switchMap((user) => {
      return this.USER.connectionsByUserID(user?.id);
    })
  );
  constructor(
    private ACT_ROUTE: ActivatedRoute,
    private USER: UserService
  ) {}

  ngOnInit(): void {}
}
