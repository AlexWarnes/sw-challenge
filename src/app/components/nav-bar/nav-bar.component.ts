import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MockDataService } from 'src/app/services/mock-data.service';
import { addUser } from 'src/app/state/users.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(
    private STORE: Store,
    private MOCK: MockDataService
  ) {}

  ngOnInit(): void {}

  handleFakeUserClick(): void {
    const newUser = this.MOCK.generateFakeUser();
    this.STORE.dispatch(addUser({ user: newUser }));
  }
  handleSeedDatabaseClick(): void {
    const seedInterval = setInterval(() => {
      this.handleFakeUserClick();
    }, 500);

    setTimeout(() => clearInterval(seedInterval), 5000);

    // TODO: Seed fake connections
  }
}
