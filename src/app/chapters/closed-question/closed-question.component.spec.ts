import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedQuestionComponent } from './closed-question.component';

describe('ClosedQuestionComponent', () => {
  let component: ClosedQuestionComponent;
  let fixture: ComponentFixture<ClosedQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
