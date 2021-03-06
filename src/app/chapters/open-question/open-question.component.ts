import {Component, Input, OnInit} from '@angular/core';
import {OpenQuestion} from '../../shared/open-question.model';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {StudentService} from '../../students/student.service';
import {Answer} from '../../shared/answer.model';
import {AuthService} from '../../auth/auth.service';
import {DataStorageService} from '../../shared/data-storage.service';

@Component({
  selector: 'app-open-question',
  templateUrl: './open-question.component.html',
  styleUrls: ['./open-question.component.css']
})
export class OpenQuestionComponent implements OnInit {
  @Input() openQuestion: OpenQuestion;
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

  getAnswerErrorMessage() {
    return this.answer.hasError('required') ? 'Pole wymagane' : '';
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
        .find(answer => answer.openQuestion != null && answer.openQuestion.id === this.openQuestion.id);

      if ( foundAnswer != null) {
        createdAnswer.id = foundAnswer.id;
      } else {
        createdAnswer.id = null;
      }

      createdAnswer.content = this.answer.value;

      createdAnswer.isCorrect = this.answer.value === this.openQuestion.correctAnswer ? 'true' : 'false';

      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      createdAnswer.replyDate = day + '.' + month + '.' + year;

      createdAnswer.studentId = this.authService.getUser().id;
      createdAnswer.openQuestion = this.openQuestion;

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
