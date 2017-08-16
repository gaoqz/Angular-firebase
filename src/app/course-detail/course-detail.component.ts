import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Lesson} from "../shared/model/lesson";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../shared/model/course.service";
import {Course} from "../shared/model/course";
const pageSize = 6;

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  course$: Observable<Course>;
  lessons$: Lesson[];
  courseUrl: string;
  showAll = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,private courseService: CourseService) { }

  ngOnInit() {
    this.courseUrl = this.activatedRoute.snapshot.params['id'];
    this.course$ = this.courseService.getCourseByUrl(this.courseUrl);
    const lessons$ = this.courseService.loadFirstLessonsPage(this.courseUrl, 6);
    lessons$.subscribe(lessons => this.lessons$ = lessons);
  }

  allCourse() {
    let lessons$;
    !this.showAll ? lessons$ = this.courseService.getAllLessonsForCourse(this.courseUrl) : lessons$ = this.courseService.loadFirstLessonsPage(this.courseUrl, 6);
    lessons$.subscribe(lessons => this.lessons$ = lessons);
    this.showAll = !this.showAll;
  }

  navigateToLesson(lesson: Lesson) {
    this.router.navigate(['lesson', lesson.url]);
  }

  previous() {
    this.courseService.loadLastPage(
      this.courseUrl,
      this.lessons$[0].$key,
      pageSize
    ).subscribe(lessons => this.lessons$ = lessons);
  }

  next() {
    this.courseService.loadNextPage(
      this.courseUrl,
      this.lessons$[this.lessons$.length -1].$key,
      pageSize
    ).subscribe(lessons => this.lessons$ = lessons);
  }

}
