import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';

import { UserEffects } from './state/user.effects';
import { ConnectionEffects } from './state/connection.effects';
import { usersReducer } from './state/users.reducer';
import { connectionReducer } from './state/connection.reducer';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ViewHomeComponent } from './components/view-home/view-home.component';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DialogFormUserComponent } from './components/dialog-form-user/dialog-form-user.component';
import { D3ScatterPlotComponent } from './components/d3-scatter-plot/d3-scatter-plot.component';
import { DialogFormConnectionComponent } from './components/dialog-form-connection/dialog-form-connection.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { UserSummaryComponent } from './components/user-summary/user-summary.component';
import { DataTilesComponent } from './components/data-tiles/data-tiles.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewUsersComponent,
    UserListComponent,
    ViewHomeComponent,
    NavBarComponent,
    DialogFormUserComponent,
    D3ScatterPlotComponent,
    DialogFormConnectionComponent,
    ViewUserComponent,
    UserSummaryComponent,
    DataTilesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({
      users: usersReducer,
      connections: connectionReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([UserEffects, ConnectionEffects]),
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  entryComponents: [DialogFormUserComponent, DialogFormConnectionComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
