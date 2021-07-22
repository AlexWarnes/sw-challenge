import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewHomeComponent } from './components/view-home/view-home.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';

const routes: Routes = [
  {path: "users", component: ViewUsersComponent},
  {path: "", component: ViewHomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
