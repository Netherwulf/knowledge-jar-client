import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Student} from '../shared/student.model';

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

}