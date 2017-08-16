import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {CourseService} from "../shared/model/course.service";
import {Course} from "../shared/model/course";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courses$ = this.courseService.getAllCourses();
  }

}
