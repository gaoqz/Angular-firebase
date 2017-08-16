import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Lesson} from "../shared/model/lesson";

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent implements OnInit {
  @Input() lessons: Lesson[];
  @Output('lesson') lessonEmitter = new EventEmitter<Lesson>();
  constructor() { }

  ngOnInit() {
  }

  selectLesson(lesson) {
    this.lessonEmitter.emit(lesson);
  }

}
