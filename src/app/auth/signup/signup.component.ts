import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../students/student.service';
import {Student} from '../../shared/student.model';
import {DataStorageService} from '../../shared/data-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;
  signupForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private studentService: StudentService,
              private dataStorageService: DataStorageService) {
  }

  login = new FormControl(null, [Validators.required, this.forbiddenLoginsCheck.bind(this)]);
  password = new FormControl(null, [Validators.required]);
  name = new FormControl(null, [Validators.required]);
  surname = new FormControl(null, [Validators.required]);
  email = new FormControl(null, [Validators.required, Validators.email]);

  getLoginErrorMessage() {
    return this.login.hasError('required') ? 'Pole wymagane' :
      this.login.hasError('loginIsForbidden') ? 'Login jest już zajęty' :
                  '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Pole wymagane' : '';
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'Pole wymagane' : '';
  }

  getSurnameErrorMessage() {
    return this.surname.hasError('required') ? 'Pole wymagane' : '';
  }

  onSignUp() {
    let createdStudent = new Student();
    createdStudent.login = this.login.value;
    createdStudent.password = this.password.value;
    createdStudent.name = this.name.value;
    createdStudent.surname = this.surname.value;
    createdStudent.email = this.email.value;
    this.studentService.addNewStudent(createdStudent)
      .subscribe(student => {
        this.studentService.addStudent(student);
        this.authService.signinUser(student.login, student.password);
      });
    this.router.navigate(['/']);
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Pole wymagane' :
      this.email.hasError('email') ? 'Błędny e-mail' : '';
  }

  ngOnInit() {
  }

  forbiddenLoginsCheck(control: FormControl): {[s: string]: boolean} {
    if (this.studentService.getStudents().map(student => student.login).indexOf(control.value) !== -1) {
      return {'loginIsForbidden': true};
    }
    return null;
  }

}
