import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {Answer} from '../../shared/answer.model';
import {StudentService} from '../student.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {
  answers: Answer[];

  constructor(private authService: AuthService,
              private studentService: StudentService,
              private router: Router) { }

  ngOnInit() {
    this.answers = this.studentService.getStudent(this.authService.getUser().id).answers;
    console.log(this.answers);
  }

  onReturn() {
    this.router.navigate(['/student']);
  }
}
