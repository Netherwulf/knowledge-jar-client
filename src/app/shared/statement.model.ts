export class Statement {
  public id: number;
  public content: string;
  public correctAnswer: string;
  public codeLink: string;


  constructor(id: number,
              content: string,
              correctAnswer: string,
              codeLink: string) {
    this.id = id;
    this.content = content;
    this.correctAnswer = correctAnswer;
    this.codeLink = codeLink;
  }
}
