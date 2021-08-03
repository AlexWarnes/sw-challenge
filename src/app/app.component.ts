import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private STORE: Store) {}
  ngOnInit() {
    this.STORE.dispatch({ type: '[App] Load Users' });
    this.STORE.dispatch({ type: 'Load Connections' });
  }
}
