import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../students/student.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;
  signupForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private studentService: StudentService) {
  }

  login = new FormControl(null, [Validators.required, this.forbiddenLoginsCheck.bind(this)]);
  password = new FormControl(null, [Validators.required]);
  name = new FormControl(null, [Validators.required]);
  surname = new FormControl(null, [Validators.required]);
  email = new FormControl(null, [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.login.hasError('required') ? 'Pole wymagane' :
      this.login.hasError('loginIsForbidden') ? 'Login jest już zajęty' :
        this.password.hasError('required') ? 'Pole wymagane' :
          this.name.hasError('required') ? 'Pole wymagane' :
            this.surname.hasError('required') ? 'Pole wymagane' :
              this.email.hasError('required') ? 'Pole wymagane' :
                this.name.hasError('email') ? 'Błędny e-mail' :
        '';
  }

  onSignUp() {
    // todo dodaj procej POSTowania nowego studenta do bazy przez API
    (this.authService.signinUser(this.login.value, this.password.value));
    if (true) {
      this.router.navigate(['/']);
    }
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
