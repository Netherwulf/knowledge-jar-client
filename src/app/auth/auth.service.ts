import {Injectable} from '@angular/core';
import {Student} from '../shared/student.model';
import {Router} from '@angular/router';
import {StudentService} from '../students/student.service';
import {HttpClient, HttpRequest} from '@angular/common/http';

@Injectable()
export class AuthService {
  user: Student;

  constructor(private router: Router, private studentService: StudentService, private httpClient: HttpClient) {
  }

  signinUser(login: string, password: string): boolean {
    const foundStudent = this.studentService.getStudents().find(student => student.login === login && student.password === password);
    if (foundStudent === undefined) {
      return false;
    } else {
      this.user = foundStudent;
      return true;
    }
  }

  logout() {
    this.user = null;
    this.router.navigate(['/']);
  }

  getUser() {
    return this.user;
  }

  isAuthenticated() {
    return this.user != null;
  }
}