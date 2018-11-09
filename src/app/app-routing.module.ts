import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FreightsListComponent} from './freights/freights-list/freights-list.component';
import {FreightsComponent} from './freights/freights.component';
import {FreightsEditComponent} from './freights/freights-edit/freights-edit.component';

const routes: Routes = [
  {path: 'freights', component: FreightsComponent, children: [
      {path: '', component: FreightsListComponent},
      {path: 'new', component: FreightsEditComponent},
      {path: 'edit/:id', component: FreightsEditComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
