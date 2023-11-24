import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DroughtTimelineModule } from './drought-timeline/drought-timeline.module';
import { HttpClientModule } from '@angular/common/http';
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, DroughtTimelineModule, HttpClientModule, ToastModule, BrowserAnimationsModule],
  providers: [MessageService,{ provide: LOCALE_ID, useValue: 'Ru' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
