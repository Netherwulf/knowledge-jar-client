import {OpenQuestion} from './open-question.model';
import {ClosedQuestion} from './closed-question.model';

export class Subchapter {
  public id: number;
  public name: string;
  public content: string;
  public codeLink: string;
  public openQuestion: OpenQuestion;
  public closedQuestion: ClosedQuestion;


  constructor(id: number,
              name: string,
              content: string,
              codeLink: string,
              openQuestion: OpenQuestion,
              closedQuestion: ClosedQuestion) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.codeLink = codeLink;
    this.openQuestion = openQuestion;
    this.closedQuestion = closedQuestion;
  }
}
