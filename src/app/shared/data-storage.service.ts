import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Chapter} from './chapter.model';
import {ChapterService} from '../chapters/chapter.service';
import {StudentService} from '../students/student.service';
import {Student} from './student.model';
import {Answer} from './answer.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private chapterService: ChapterService,
              private studentService: StudentService) {
  }
  getChapters() {
    this.httpClient.get<Response>('https://knowledge-jar.herokuapp.com/api/v1/chapters', {
      observe: 'body'
    }).pipe(map(
      (response) => {
        return response['chapters'];
      }
    ))
      .subscribe(
        (chapters: Chapter[]) => {
          this.chapterService.setChapters(chapters);
          console.log(this.chapterService.getChapters());
        }
      );
  }

  getStudents() {
    this.httpClient.get<Response>('https://knowledge-jar.herokuapp.com/api/v1/students', {
      observe: 'body'
    }).pipe(map(
      (response) => {
        for (let student of response['students']) {
          if (!student['answers']) {
            student['answers'] = [];
          }
        }
        return response['students'];
      }
    ))
      .subscribe(
        (students: Student[]) => {
          this.studentService.setStudents(students);
          console.log(this.studentService.getStudents());
        }
      );
  }
}
