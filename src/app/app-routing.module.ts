import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FreightsListComponent} from './freights/freights-list/freights-list.component';
import {FreightsComponent} from './freights/freights.component';
import {FreightsManagerComponent} from './freights/freights-manager/freights-manager.component';

const routes: Routes = [
  {path: 'freights', component: FreightsComponent, children: [
      {path: '', component: FreightsListComponent},
      {path: 'manager/:freightId', component: FreightsManagerComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
