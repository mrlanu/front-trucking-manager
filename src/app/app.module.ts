import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FreightsComponent } from './freights/freights.component';
import { FreightsListComponent } from './freights/freights-list/freights-list.component';
import { FreightsEditComponent } from './freights/freights-edit/freights-edit.component';
import {FreightsService} from './freights/freights.service';
import {HttpClientModule} from '@angular/common/http';
import { EmployeeComponent } from './employee/employee.component';
import {ReactiveFormsModule} from '@angular/forms';
import { FreightsManagerComponent } from './freights/freights-manager/freights-manager.component';
import { PickupsListComponent } from './freights/pickups/pickups-list/pickups-list.component';
import { PickupItemComponent } from './freights/pickups/pickups-list/pickup-item/pickup-item.component';
import { PickupEditComponent } from './freights/pickups/pickup-edit/pickup-edit.component';
import { FreightsViewComponent } from './freights/freights-view/freights-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    FreightsComponent,
    FreightsListComponent,
    FreightsEditComponent,
    EmployeeComponent,
    FreightsManagerComponent,
    PickupsListComponent,
    PickupItemComponent,
    PickupEditComponent,
    FreightsViewComponent
  ],
  imports: [
    MaterialModule,
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [FreightsService],
  bootstrap: [AppComponent],
  entryComponents: [FreightsEditComponent, PickupEditComponent]
})
export class AppModule { }
