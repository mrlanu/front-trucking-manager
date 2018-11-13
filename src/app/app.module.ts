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
import { PartialsListComponent } from './freights/partials/partials-list/partials-list.component';
import { PartialsItemComponent } from './freights/partials/partials-list/partials-item/partials-item.component';
import { PartialsEditComponent } from './freights/partials/partials-edit/partials-edit.component';
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
    PartialsListComponent,
    PartialsItemComponent,
    PartialsEditComponent,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
