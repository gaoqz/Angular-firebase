import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LessonsService} from "../shared/model/lessons.service";
import {Lesson} from "../shared/model/lesson";

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss']
})
export class LessonDetailComponent implements OnInit {

  lesson: Lesson;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private lessonsService: LessonsService) {
  }

  ngOnInit() {
    // const lessonUrl = this.activatedRoute.snapshot.params['id'];
    // const lesson$ = this.lessonsService.getLessonByUrl(lessonUrl);
    // lesson$.subscribe(lesson => this.lesson = lesson);
    this.activatedRoute.params.switchMap(
      params => {
        const lessonUrl = params['id'];
        return this.lessonsService.getLessonByUrl(lessonUrl);
      }
    )
      .do(console.log)
      .subscribe(lesson => this.lesson = lesson);
  }

  previous() {
    this.lessonsService.loadPreviousLesson(this.lesson.courseId, this.lesson.$key)
      .subscribe(this.navigateToLesson.bind(this));
  }

  next() {
    this.lessonsService.loadNextLesson(this.lesson.courseId, this.lesson.$key)
      .subscribe(this.navigateToLesson.bind(this));
  }

  navigateToLesson(lesson: Lesson) {
    this.router.navigate(['lesson', lesson.url]);
  }
}
