import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { GistModule } from '@sgbj/angular-gist';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GistModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
