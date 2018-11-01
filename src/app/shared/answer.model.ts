import {OpenQuestion} from './open-question.model';
import {Statement} from './statement.model';
import {ClosedQuestion} from './closed-question.model';

export class Answer {
  public id: number;
  public content: string;
  public isCorrect: string;
  public replyDate: string;
  public studentId: number;
  public openQuestion: OpenQuestion;
  public statement: Statement;
  public closedQuestion: ClosedQuestion;


  constructor(id: number,
              content: string,
              isCorrect: string,
              replyDate: string,
              studentId: number,
              openQuestion: OpenQuestion,
              statement: Statement,
              closedQuestion: ClosedQuestion) {
    this.id = id;
    this.content = content;
    this.isCorrect = isCorrect;
    this.replyDate = replyDate;
    this.studentId = studentId;
    this.openQuestion = openQuestion;
    this.statement = statement;
    this.closedQuestion = closedQuestion;
  }
}
