import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgxGistModule } from 'ngx-gist/dist/ngx-gist.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import '@angular/material';
import {DataStorageService} from './shared/data-storage.service';
import {ChapterService} from './chapters/chapter.service';
import {StudentService} from './students/student.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxGistModule,
    HttpClientModule
  ],
  providers: [DataStorageService, ChapterService, StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
