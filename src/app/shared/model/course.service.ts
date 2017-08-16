import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Course} from "./course";
import {AngularFireDatabase} from "angularfire2/database/database";
import {Lesson} from "./lesson";
import {FirebaseListFactoryOpts} from "angularfire2/interfaces";

@Injectable()
export class CourseService {

  constructor(private db: AngularFireDatabase) {
  }

  getAllCourses(): Observable<Course[]> {
    return this.db.list('courses').map(Course.fromJsonArray);
  }

  getCourseByUrl(courseUrl: string): Observable<Course> {
    return this.db.list('courses', {
      query: {
        orderByChild: 'url',
        equalTo: courseUrl
      }
    }).map(results => results[0]);

  }

  getLessonKeysPerCourseUrl(courseUrl: string,
                            query: FirebaseListFactoryOpts = {}): Observable<string[]> {
    return this.getCourseByUrl(courseUrl)
      .switchMap(course => this.db.list(`lessonsPerCourse/${course.$key}`, query))
      .map(lspc => lspc.map(lpc => lpc.$key));
  }

  getLessonForLessonKeys(lessonKeys$: Observable<string[]>): Observable<Lesson[]> {
    return lessonKeys$
      .map(lspc => lspc.map(lessonKey => this.db.object(`lessons/${lessonKey}`)))
      .flatMap(fbojs => Observable.combineLatest(fbojs));
  }

  getAllLessonsForCourse(courseUrl: string): Observable<Lesson[]> {
    return this.getLessonForLessonKeys(this.getLessonKeysPerCourseUrl(courseUrl));
  }

  loadFirstLessonsPage(courseUrl: string, pageSize: number): Observable<Lesson[]> {

    const firstPageLessonsKey$ = this.getLessonKeysPerCourseUrl(courseUrl, {
      query: {
        limitToFirst: pageSize
      }
    });

    return this.getLessonForLessonKeys(firstPageLessonsKey$);
  }

  loadNextPage(courseUrl: string,
               lessonKey:string, pageSize: number): Observable<Lesson[]> {

    const lessonKeys$ = this.getLessonKeysPerCourseUrl(courseUrl, {
      query: {
        orderByKey: true,
        startAt: lessonKey,
        limitToFirst: pageSize + 1
      }
    });

    return this.getLessonForLessonKeys(lessonKeys$)
      .map(lessons => lessons.slice(1, lessons.length));
  }

  loadLastPage(courseUrl: string,
               lessonKey:string, pageSize: number): Observable<Lesson[]> {

    const lessonKeys$ = this.getLessonKeysPerCourseUrl(courseUrl, {
      query: {
        orderByKey: true,
        endAt: lessonKey,
        limitToLast: pageSize + 1
      }
    });

    return this.getLessonForLessonKeys(lessonKeys$)
      .map(lessons => lessons.slice(0, lessons.length - 1));
  }

}
