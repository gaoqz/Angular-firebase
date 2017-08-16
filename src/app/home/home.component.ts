import { Component, OnInit } from '@angular/core';
import {Lesson} from "../shared/model/lesson";
import {LessonsService} from "../shared/model/lessons.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allLessons: Lesson[];
  filtered: Lesson[];
  constructor(private lessonsService: LessonsService) { }

  ngOnInit() {
    this.lessonsService.getAllLessons()
      .do(console.log)
      .subscribe(lessons => this.allLessons = this.filtered = lessons);
  }

  search(keyword: string) {
    this.allLessons ? this.filtered = this.allLessons.filter(lesson => lesson.description.includes(keyword)) : null;
  }

}
