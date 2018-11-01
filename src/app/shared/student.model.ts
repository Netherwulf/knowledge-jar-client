import {Chapter} from './chapter.model';
import {Answer} from './answer.model';

export class Student {
  public id: number;
  public login: string;
  public password: string;
  public name: string;
  public surname: string;
  public progress: number;
  public email: string;
  public joinDate: string;
  public chapters: Chapter[];
  public answers: Answer[];


  constructor(id: number,
              login: string,
              password: string,
              name: string,
              surname: string,
              progress: number,
              email: string,
              joinDate: string,
              chapters: Chapter[],
              answers: Answer[]) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.progress = progress;
    this.email = email;
    this.joinDate = joinDate;
    this.chapters = chapters;
    this.answers = answers;
  }
}
