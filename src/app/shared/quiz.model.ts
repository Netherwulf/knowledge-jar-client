import {OpenQuestion} from './open-question.model';
import {ClosedQuestion} from './closed-question.model';

export class Quiz {
  public id: number;
  public name: string;
  public openQuestions: OpenQuestion[];
  public closedQuestions: ClosedQuestion[];


  constructor(id: number,
              name: string,
              openQuestions: OpenQuestion[],
              closedQuestions: ClosedQuestion[]) {
    this.id = id;
    this.name = name;
    this.openQuestions = openQuestions;
    this.closedQuestions = closedQuestions;
  }
}
