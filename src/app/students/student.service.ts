import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Student} from '../shared/student.model';
import {Answer} from '../shared/answer.model';
import {AuthService} from '../auth/auth.service';
import {Chapter} from '../shared/chapter.model';

@Injectable()
export class StudentService {
  studentsChanged = new Subject<Student[]>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  private students: Student[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getStudents() {
    return this.students.slice();
  }

  getStudent(studentId: number) {
    return this.students.slice().find(studentElem => studentElem.id === studentId);
  }

  addStudent(student: Student) {
    this.students.push(student);
    this.studentsChanged.next(this.students.slice());
  }

  addNewStudent(student: Student) {
    student.progress = 0;
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    student.joinDate = day + '.' + month + '.' + year;
    student.chapters = [];
    student.answers = [];

    return this.httpClient.post<Student>('https://knowledge-jar.herokuapp.com/api/v1/students', student, this.httpOptions);
  }

  updateStudent(index: number, newStudent: Student) {
    this.students[index] = newStudent;
    this.studentsChanged.next(this.students.slice());
  }

  deleteStudent(index: number) {
    this.students.splice(index, 1);
    this.studentsChanged.next(this.students.slice());
  }

  setStudents(students: Student[]) {
    this.students = students;
    this.studentsChanged.next(this.students.slice());
  }

  addNewAnswer(answer: Answer) {
    if (answer.id !== null) {
      // console.log('Aktualizuje: ' + answer);
      return this.httpClient
        .put<Answer>('https://knowledge-jar.herokuapp.com/api/v1/students/' + answer.studentId + '/answers', answer, this.httpOptions);
    } else {
      // console.log('Dodaje nowe: ' + answer);
      return this.httpClient
        .post<Answer>('https://knowledge-jar.herokuapp.com/api/v1/students/' + answer.studentId + '/answers', answer, this.httpOptions);
    }
  }

  addAnswer(answer: Answer) {
    if (!(this.students
      .find(studentElem => studentElem.id === answer.studentId).answers
      .map(answerEl => answerEl.id).indexOf(answer.id) !== -1)) {
      if (answer.openQuestion != null) {
        let foundAnswer = this.students
          .find(studentElem => studentElem.id === answer.studentId)
          .answers
          .find(answerElem => answerElem.openQuestion.id === answer.openQuestion.id);
        foundAnswer.isCorrect = answer.isCorrect;
        foundAnswer.content = answer.content;
        foundAnswer.replyDate = answer.replyDate;
      }
      if (answer.closedQuestion != null) {
        let foundAnswer = this.students
          .find(studentElem => studentElem.id === answer.studentId)
          .answers
          .find(answerElem => answerElem.closedQuestion.id === answer.closedQuestion.id);
        foundAnswer.isCorrect = answer.isCorrect;
        foundAnswer.content = answer.content;
        foundAnswer.replyDate = answer.replyDate;
      }
    } else {
      this.students
        .find(studentElem => studentElem.id === answer.studentId).answers.push(answer);
    }
  }

}
