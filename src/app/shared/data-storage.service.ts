import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Chapter} from './chapter.model';
import {ChapterService} from '../chapters/chapter.service';
import {StudentService} from '../students/student.service';
import {Student} from './student.model';
import {Answer} from './answer.model';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private chapterService: ChapterService,
              private studentService: StudentService) {
  }
  getChapters() {
    this.httpClient.get<Chapter[]>('https://knowledge-jar.herokuapp.com/api/v1/chapters', {
      observe: 'body'
    }).map(
      (chapters) => {
        chapters = chapters.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
        for (let chapter of chapters) {
          chapter.subchapters = chapter.subchapters.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
          chapter.quiz.closedQuestions = chapter.quiz.closedQuestions.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
          for (let closedQuestion of chapter.quiz.closedQuestions) {
            closedQuestion.statements = closedQuestion.statements.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
          }
          chapter.quiz.openQuestions = chapter.quiz.openQuestions.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
          chapter.subchapters.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
          for (let subchapter of chapter.subchapters) {
            if (!subchapter['closedQuestion']) {
              subchapter.closedQuestion.statements.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
            }
          }
        }
        console.log(chapters);
        return chapters;
      }
    )
      .subscribe(
        (chapters: Chapter[]) => {
          this.chapterService.setChapters(chapters);
        }
      );
  }

  getStudents() {
    this.httpClient.get<Student[]>('https://knowledge-jar.herokuapp.com/api/v1/students', {
      observe: 'body'
    }).map(
      (students) => {
        console.log(students);
        students = students.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
        for (let student of students) {
          if (!student['answers']) {
            student['answers'] = [];
          }
          student.answers = student.answers.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
        }
        return students;
      }
    )
      .subscribe(
        (students: Student[]) => {
          this.studentService.setStudents(students);
        }
      );
  }
}
