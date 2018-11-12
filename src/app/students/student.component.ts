import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Student} from '../shared/student.model';
import {Router} from '@angular/router';
import {StudentService} from './student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  student: Student;
  progress: string;

  constructor(private authService: AuthService,
              private studentService: StudentService,
              private router: Router) {
    this.student = this.studentService.getStudent(this.authService.getUser().id);
    this.progress = (this.student.answers.filter(answer => answer.isCorrect === 'true').length / 30.0 * 100.0).toFixed(2);
  }

  ngOnInit() {
  }

  onAnswersView() {
    this.router.navigate(['/student', 'answers']);
  }
}
