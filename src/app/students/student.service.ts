import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Student} from '../shared/student.model';

@Injectable()
export class StudentService {
  studentsChanged = new Subject<Student[]>();

  private students: Student[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getStudents() {
    return this.students.slice();
  }

  getStudent(index: number) {
    return this.students.slice()[index];
  }

  addStudent(student: Student) {
    this.students.push(student);
    this.studentsChanged.next(this.students.slice());
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
