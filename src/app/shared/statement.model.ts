export class Statement {
  public id: number;
  public content: string;
  public isCorrect: string;
  public codeLink: string;


  constructor(id: number,
              content: string,
              isCorrect: string,
              codeLink: string) {
    this.id = id;
    this.content = content;
    this.isCorrect = isCorrect;
    this.codeLink = codeLink;
  }
}
