import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Chapter} from '../shared/chapter.model';

@Injectable()
export class ChapterService {
  chaptersChanged = new Subject<Chapter[]>();

  private chapters: Chapter[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getChapters() {
    return this.chapters.slice();
  }

  getChapter(index: number) {
    return this.chapters.slice()[index];
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
    this.chapters = chapters;
    this.chaptersChanged.next(this.chapters.slice());
  }

}
