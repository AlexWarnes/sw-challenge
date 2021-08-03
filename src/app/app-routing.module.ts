import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewHomeComponent } from './components/view-home/view-home.component';
import { ViewUserComponent } from './components/view-user/view-user.component';

const routes: Routes = [
  {path: "user/:userID", component: ViewUserComponent},
  {path: "", component: ViewHomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
