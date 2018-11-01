import {Statement} from './statement.model';

export class ClosedQuestion {
  public id: number;
  public content: string;
  public codeLink: string;
  public statements: Statement[];


  constructor(id: number, content: string, codeLink: string, statements: Statement[]) {
    this.id = id;
    this.content = content;
    this.codeLink = codeLink;
    this.statements = statements;
  }
}
