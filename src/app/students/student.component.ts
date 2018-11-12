import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Student} from '../shared/student.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  student: Student = this.authService.getUser();

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onAnswersView() {
    this.router.navigate(['/student', 'answers']);
  }
}
