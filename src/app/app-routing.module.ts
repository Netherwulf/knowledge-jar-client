import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SigninComponent} from './auth/signin/signin.component';
import {SignupComponent} from './auth/signup/signup.component';
import {ChaptersComponent} from './chapters/chapters.component';
import {StudentComponent} from './students/student.component';
import {SubchapterComponent} from './chapters/subchapter/subchapter.component';
import {QuizComponent} from './chapters/quiz/quiz.component';
import {AuthGuardService} from './auth/auth-guard.service';

const appRoutes: Routes = [
  // { path: '', redirectTo: '/chapters', pathMatch: 'full' },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'chapters', component: ChaptersComponent, children: [
      { path: ':id/quiz', component: QuizComponent, canActivate: [AuthGuardService] },
      { path: ':id/subchapters/:subchapterId', component: SubchapterComponent, canActivate: [AuthGuardService] }
    ] },
  { path: 'student', component: StudentComponent, canActivate: [AuthGuardService] },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
