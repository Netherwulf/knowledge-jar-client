import {Component, OnInit} from '@angular/core';
import {Chapter} from './shared/chapter.model';
import {Student} from './shared/student.model';
import {StudentService} from './students/student.service';
import {ChapterService} from './chapters/chapter.service';
import {DataStorageService} from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'knowledge-jar';
  chapters: Chapter[];
  students: Student[];

  constructor(private dataStorageService: DataStorageService,
              private chapterService: ChapterService,
              private studentService: StudentService) { }

  ngOnInit() {
    this.dataStorageService.getChapters();
    this.dataStorageService.getStudents();
    this.chapters = this.chapterService.getChapters();
    this.students = this.studentService.getStudents();
  }

}
