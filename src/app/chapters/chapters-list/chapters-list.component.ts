import { Component, OnInit } from '@angular/core';
import {ChapterService} from '../chapter.service';
import {Chapter} from '../../shared/chapter.model';

@Component({
  selector: 'app-chapters-list',
  templateUrl: './chapters-list.component.html',
  styleUrls: ['./chapters-list.component.css']
})
export class ChaptersListComponent implements OnInit {
  panelOpenState = false;

  chapters: Chapter[];

  constructor(private chapterService: ChapterService) { }

  ngOnInit() {
    this.chapters = this.chapterService.getChapters();
  }

}
