import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {ChapterService} from '../chapter.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subchapter} from '../../shared/subchapter.model';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-subchapter',
  templateUrl: './subchapter.component.html',
  styleUrls: ['./subchapter.component.css']
})
export class SubchapterComponent implements OnInit, AfterViewInit {
  subchapter: Subchapter;
  @ViewChild('content') content: ElementRef;

  constructor(private chapterService: ChapterService,
              private route: ActivatedRoute,
              private router: Router,
              private renderer: Renderer2) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.subchapter = this.chapterService.getSubchapter(+params['id'], +params['subchapterId']);
          // console.log(this.subchapter);
        }
      );
  }

  ngAfterViewInit() {
    const d2 = this.renderer.createElement('ngx-gist');
    this.renderer.setAttribute(d2, 'gistId', '\'' + this.subchapter.codeLink + '\'');
    this.renderer.appendChild(this.content.nativeElement, d2);
  }

}
