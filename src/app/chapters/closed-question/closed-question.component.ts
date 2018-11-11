import {Component, Input, OnInit} from '@angular/core';
import {OpenQuestion} from '../../shared/open-question.model';
import {ClosedQuestion} from '../../shared/closed-question.model';

@Component({
  selector: 'app-closed-question',
  templateUrl: './closed-question.component.html',
  styleUrls: ['./closed-question.component.css']
})
export class ClosedQuestionComponent implements OnInit {
  @Input() closedQuestion: ClosedQuestion;

  constructor() { }

  ngOnInit() {
  }

}
