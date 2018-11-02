import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubchapterComponent } from './subchapter.component';

describe('SubchapterComponent', () => {
  let component: SubchapterComponent;
  let fixture: ComponentFixture<SubchapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubchapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubchapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
