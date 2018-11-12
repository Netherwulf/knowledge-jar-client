import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatCardModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule, MatListModule,
  MatMenuModule, MatRadioModule,
  MatRippleModule, MatStepperModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {DataStorageService} from './shared/data-storage.service';
import {ChapterService} from './chapters/chapter.service';
import {StudentService} from './students/student.service';
import { HeaderComponent } from './header/header.component';
import { StudentComponent } from './students/student.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { ChaptersListComponent } from './chapters/chapters-list/chapters-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import {AppRoutingModule} from './app-routing.module';
import { SubchapterComponent } from './chapters/subchapter/subchapter.component';
import { QuizComponent } from './chapters/quiz/quiz.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {AuthService} from './auth/auth.service';
import {PortalModule} from '@angular/cdk/portal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OpenQuestionComponent } from './chapters/open-question/open-question.component';
import { ClosedQuestionComponent } from './chapters/closed-question/closed-question.component';
import { AnswersComponent } from './students/answers/answers.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudentComponent,
    ChaptersComponent,
    ChaptersListComponent,
    SignupComponent,
    SigninComponent,
    SubchapterComponent,
    QuizComponent,
    OpenQuestionComponent,
    ClosedQuestionComponent,
    AnswersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatRippleModule,
    MatFormFieldModule,
    AppRoutingModule,
    PortalModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatExpansionModule,
    MatButtonModule,
    MatListModule,
    MatTabsModule,
    MatRadioModule,
    MatStepperModule
  ],
  providers: [
    DataStorageService,
    ChapterService,
    StudentService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
