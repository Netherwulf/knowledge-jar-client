import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Chapter} from '../shared/chapter.model';
import {Subchapter} from '../shared/subchapter.model';
import {Quiz} from '../shared/quiz.model';

@Injectable()
export class ChapterService {
  chaptersChanged = new Subject<Chapter[]>();

  private chapters: Chapter[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getChapters(): Chapter[] {
    return this.chapters.slice();
  }

  getChapter(index: number): Chapter {
    return this.chapters.slice().find(chapterElem => chapterElem.id === index);
  }

  addChapter(chapter: Chapter) {
    this.chapters.push(chapter);
    this.chaptersChanged.next(this.chapters.slice());
  }

  updateChapter(index: number, newChapter: Chapter) {
    this.chapters[index] = newChapter;
    this.chaptersChanged.next(this.chapters.slice());
  }

  deleteChapter(index: number) {
    this.chapters.splice(index, 1);
    this.chaptersChanged.next(this.chapters.slice());
  }

  setChapters(chapters: Chapter[]) {
    chapters[0].subchapters = [
      chapters[0].subchapters[1],
      chapters[0].subchapters[2],
      chapters[0].subchapters[0]
    ];
    chapters[1].subchapters = [
      chapters[1].subchapters[0],
      chapters[1].subchapters[1],
      chapters[1].subchapters[2]
    ];
    chapters[2].subchapters = [
      chapters[2].subchapters[0],
      chapters[2].subchapters[1],
    ];
    chapters[3].subchapters = [
      chapters[3].subchapters[2],
      chapters[3].subchapters[4],
      chapters[3].subchapters[5],
      chapters[3].subchapters[0],
      chapters[3].subchapters[3],
      chapters[3].subchapters[1]
    ];
    this.chapters = chapters;
    this.chaptersChanged.next(this.chapters.slice());
  }

  getSubchapter(chapterId: number, subchapterId: number): Subchapter {
    const chapter: Chapter = this.chapters.slice().find(chapterElem => chapterElem.id === chapterId);
    return chapter.subchapters.find(subchapter => subchapter.id === subchapterId);
  }

  getQuiz(chapterId: number): Quiz {
    const chapter: Chapter = this.chapters.slice().find(chapterElem => chapterElem.id === chapterId);
    return chapter.quiz;
  }

}
