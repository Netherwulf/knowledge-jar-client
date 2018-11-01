import {Student} from './student.model';
import {Quiz} from './quiz.model';
import {Subchapter} from './subchapter.model';

export class Chapter {
  public id: number;
  public name: string;
  public description: string;
  public subchapters: Subchapter[];
  public quiz: Quiz;

  constructor(id: number,
              name: string,
              description: string,
              subchapters: Subchapter[],
              quiz: Quiz) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.subchapters = subchapters;
    this.quiz = quiz;
  }
}
