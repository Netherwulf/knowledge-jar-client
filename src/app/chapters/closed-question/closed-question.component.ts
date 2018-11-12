import {Component, Input, OnInit} from '@angular/core';
import {ClosedQuestion} from '../../shared/closed-question.model';
import {Router} from '@angular/router';
import {StudentService} from '../../students/student.service';
import {AuthService} from '../../auth/auth.service';
import {FormControl, Validators} from '@angular/forms';
import {Answer} from '../../shared/answer.model';
import {DataStorageService} from '../../shared/data-storage.service';

@Component({
  selector: 'app-closed-question',
  templateUrl: './closed-question.component.html',
  styleUrls: ['./closed-question.component.css']
})
export class ClosedQuestionComponent implements OnInit {
  @Input() closedQuestion: ClosedQuestion;
  buttonText = 'Sprawdź';
  correctAnswerSubmitted = false;
  wrongAnswer = false;

  constructor(private router: Router,
              private studentService: StudentService,
              private authService: AuthService,
              private dataStorageService: DataStorageService) { }

  answer = new FormControl(null, [Validators.required]);

  ngOnInit() {
    this.buttonText = 'Sprawdź';
    this.correctAnswerSubmitted = false;
    this.wrongAnswer = false;
  }

  onSubmitAnswer() {
    if (this.buttonText === 'Dalej') {
      this.buttonText = 'Sprawdź';
      this.correctAnswerSubmitted = false;
      this.wrongAnswer = false;
      this.router.navigate(['/chapters', 'list']);
    } else {
      const createdAnswer = new Answer();

      let foundAnswer = this.studentService.getStudent(this.authService.getUser().id)
        .answers
        .find(answer => answer.closedQuestion != null && answer.closedQuestion.id === this.closedQuestion.id);

      if ( foundAnswer != null) {
        createdAnswer.id = foundAnswer.id;
      } else {
        createdAnswer.id = null;
      }

      createdAnswer.content = this.answer.value;

      createdAnswer.isCorrect = this.closedQuestion.statements.find(statement => statement.content === this.answer.value).isCorrect;

      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      createdAnswer.replyDate = day + '.' + month + '.' + year;

      createdAnswer.studentId = this.authService.getUser().id;
      createdAnswer.closedQuestion = this.closedQuestion;
      createdAnswer.statement = this.closedQuestion.statements.find(statement => statement.content === this.answer.value);

      this.studentService.addNewAnswer(createdAnswer)
        .subscribe(answer => {
          this.dataStorageService.getStudents();
        });

      if (createdAnswer.isCorrect === 'true') {
        this.correctAnswerSubmitted = true;
        this.buttonText = 'Dalej';
        this.wrongAnswer = false;
      } else {
        this.wrongAnswer = true;
      }
    }
  }
}
