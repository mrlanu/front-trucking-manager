import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FreightsListComponent} from './freights/freights-list/freights-list.component';
import {FreightsComponent} from './freights/freights.component';
import {FreightsManagerComponent} from './freights/freights-manager/freights-manager.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'freights', component: FreightsComponent, canActivateChild: [AuthGuard], children: [
      {path: '', component: FreightsListComponent},
      {path: 'manager/:freightId', component: FreightsManagerComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
