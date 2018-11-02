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

  signupUser(user: Student) {
    const foundStudent = this.studentService.getStudents()
                          .find(student => student.login === user.login && student.password === user.password);
    if (foundStudent === undefined) {
      const request = new HttpRequest('POST', 'https://knowledge-jar.herokuapp.com/api/v1/students',
        user, {
          reportProgress: true,
          // params: new HttpParams().set('auth', token)
        }
      );
      return this.httpClient.request(request);
    }
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
