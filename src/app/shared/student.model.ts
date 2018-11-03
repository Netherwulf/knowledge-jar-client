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


  constructor() {}
}
