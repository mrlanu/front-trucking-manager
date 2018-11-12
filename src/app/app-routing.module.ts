import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FreightsListComponent} from './freights/freights-list/freights-list.component';
import {FreightsComponent} from './freights/freights.component';
import {FreightsEditComponent} from './freights/freights-edit/freights-edit.component';
import {FreightsManagerComponent} from './freights/freights-manager/freights-manager.component';

const routes: Routes = [
  {path: 'freights', component: FreightsComponent, children: [
      {path: '', component: FreightsListComponent},
      {path: 'manager/:freightId', component: FreightsManagerComponent},
      {path: 'new', component: FreightsEditComponent},
      {path: 'edit/:freightId', component: FreightsEditComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
