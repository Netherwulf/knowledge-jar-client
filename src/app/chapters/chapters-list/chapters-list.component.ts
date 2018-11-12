import {AfterViewInit, ApplicationRef, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ChapterService} from '../chapter.service';
import {Chapter} from '../../shared/chapter.model';
import {Student} from '../../shared/student.model';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-chapters-list',
  templateUrl: './chapters-list.component.html',
  styleUrls: ['./chapters-list.component.css']
})
export class ChaptersListComponent implements OnInit {

  chapters: Chapter[];
  student: Student;

  constructor(private chapterService: ChapterService,
              private authService: AuthService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.chapters = this.chapterService.getChapters();
    this.student = this.authService.getUser();
    this.cdr.detectChanges();
  }

  checkChapter(i: number): boolean {
    const value =  i !== 0 &&
      this.chapterService.getChapters()[i - 1]
      .quiz
      .closedQuestions
      .map(closedQuestion => closedQuestion.id)
      .filter(closedQuestionId => this.authService.getUser().answers
        .filter(answer => answer.closedQuestion != null)
          .map(closedQuestion => closedQuestion.id)
          .indexOf(closedQuestionId) < 0)
      .length === 0 &&
      this.chapterService.getChapters()[i - 1]
      .quiz
      .openQuestions
      .map(openQuestion => openQuestion.id)
      .filter(openQuestionId => this.authService.getUser().answers
        .filter(answer => answer.openQuestion != null)
        .map(openQuestion => openQuestion.id)
        .indexOf(openQuestionId) < 0)
      .length === 0;
    return value;
  }

}
