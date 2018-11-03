import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  hide = true;
  wrongCredentials: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  login = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.login.hasError('required') ? 'Pole wymagane' :
      this.password.hasError('required') ? 'Pole wymagane' :
        '';
  }

  signIn() {
    this.wrongCredentials = !(this.authService.signinUser(this.login.value, this.password.value));
    if (!this.wrongCredentials) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

}
