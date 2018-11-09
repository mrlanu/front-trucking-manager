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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    FreightsComponent,
    FreightsListComponent,
    FreightsEditComponent
  ],
  imports: [
    MaterialModule,
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [FreightsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
