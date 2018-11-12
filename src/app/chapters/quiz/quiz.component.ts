import {Component, OnInit, ViewChild} from '@angular/core';
import {Quiz} from '../../shared/quiz.model';
import {ChapterService} from '../chapter.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {StudentService} from '../../students/student.service';
import {Answer} from '../../shared/answer.model';
import {ClosedQuestion} from '../../shared/closed-question.model';
import {AuthService} from '../../auth/auth.service';
import {FormControl, Validators} from '@angular/forms';
import {OpenQuestion} from '../../shared/open-question.model';
import {MatStepper} from '@angular/material';
import {Chapter} from '../../shared/chapter.model';
import {DataStorageService} from '../../shared/data-storage.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  @ViewChild('stepper') private stepper: MatStepper;
  quiz: Quiz;
  chapter: Chapter;
  buttonText = 'Sprawdź';
  correctAnswerSubmitted = false;
  wrongAnswer = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private studentService: StudentService,
              private chapterService: ChapterService,
              private authService: AuthService,
              private dataStorageService: DataStorageService) { }

  answer = new FormControl(null, [Validators.required]);

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.chapter = this.chapterService.getChapter(+params['id']);
          this.quiz = this.chapter.quiz;
          // console.log(this.quiz);
        }
      );
    this.buttonText = 'Sprawdź';
    this.correctAnswerSubmitted = false;
    this.wrongAnswer = false;
  }

  getAnswerErrorMessage() {
    return this.answer.hasError('required') ? 'Pole wymagane' : '';
  }

  onSubmitClosedQuestionAnswer(closedQuestion: ClosedQuestion) {
    const currentClosedQuestion = closedQuestion;

    if (this.buttonText === 'Dalej') {
      this.buttonText = 'Sprawdź';
      this.correctAnswerSubmitted = false;
      this.wrongAnswer = false;
      this.stepper.next();
    } else {
      const createdAnswer = new Answer();

      let foundAnswer = this.studentService.getStudent(this.authService.getUser().id)
        .answers
        .find(answer => answer.closedQuestion != null && answer.closedQuestion.id === closedQuestion.id);

      if ( foundAnswer != null) {
        createdAnswer.id = foundAnswer.id;
      } else {
        createdAnswer.id = null;
      }

      createdAnswer.content = this.answer.value;

      createdAnswer.isCorrect = currentClosedQuestion.statements.find(statement => statement.content === this.answer.value).isCorrect;

      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      createdAnswer.replyDate = day + '.' + month + '.' + year;

      createdAnswer.studentId = this.authService.getUser().id;
      createdAnswer.closedQuestion = currentClosedQuestion;
      createdAnswer.statement = currentClosedQuestion.statements.find(statement => statement.content === this.answer.value);

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

  onSubmitOpenQuestionAnswer(openQuestion: OpenQuestion) {
    const currentOpenQuestion = openQuestion;

    if (this.buttonText === 'Dalej') {
      this.buttonText = 'Sprawdź';
      this.correctAnswerSubmitted = false;
      this.wrongAnswer = false;
      this.stepper.next();
    } else {
      const createdAnswer = new Answer();

      let foundAnswer = this.studentService.getStudent(this.authService.getUser().id)
        .answers
        .find(answer => answer.openQuestion != null && answer.openQuestion.id === openQuestion.id);

      if ( foundAnswer != null) {
        createdAnswer.id = foundAnswer.id;
      } else {
        createdAnswer.id = null;
      }

      createdAnswer.content = this.answer.value;

      createdAnswer.isCorrect = this.answer.value === currentOpenQuestion.correctAnswer ? 'true' : 'false';

      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      createdAnswer.replyDate = day + '.' + month + '.' + year;

      createdAnswer.studentId = this.authService.getUser().id;
      createdAnswer.openQuestion = currentOpenQuestion;

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

  onQuizFinished() {
    this.buttonText = 'Sprawdź';
    this.correctAnswerSubmitted = false;
    this.wrongAnswer = false;
    this.router.navigate(['/chapters', 'list']);
  }
}
