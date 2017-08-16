import {Injectable, Inject} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database/database";
import {Lesson} from "./lesson";
import {Observable} from  "rxjs/Observable";
import {FirebaseApp} from "angularfire2";
import {Subject} from "rxjs";

@Injectable()
export class LessonsService {

  sdbDb: any;

  constructor(private db: AngularFireDatabase, @Inject(FirebaseApp) fb: FirebaseApp) {
    this.sdbDb = fb.database();
  }

  getAllLessons(): Observable<Lesson[]> {
    return this.db.list('lessons')
      .map(Lesson.fromJsonList);
  }

  getLessonByUrl(url: string): Observable<Lesson> {
    return this.db.list('lessons', {
      query: {
        orderByChild: 'url',
        equalTo: url
      }
    })
      .filter(results => results && results.length > 0)
      .map(results => Lesson.fromJson(results[0]));
  }

  loadPreviousLesson(courseId: string, lessonId: string):Observable<Lesson>{

    return this.db.list(`lessonsPerCourse/${courseId}`, {
      query: {
        orderByKey: true,
        endAt: lessonId,
        limitToLast: 2
      }
    })
      .filter(results => results && results.length > 0)
      .map(results => results[0].$key)
      .switchMap(lessonId => this.db.object(`lessons/${lessonId}`))
      .map(Lesson.fromJson);

  }

  loadNextLesson(courseId: string, lessonId: string):Observable<Lesson>{

    return this.db.list(`lessonsPerCourse/${courseId}`, {
      query: {
        orderByKey: true,
        startAt: lessonId,
        limitToFirst: 2
      }
    })
      .filter(results => results && results.length > 0)
      .map(results => results[1].$key)
      .switchMap(lessonId => this.db.object(`lessons/${lessonId}`))
      .map(Lesson.fromJson);

  }

  createNewLesson(courseId: string, lesson: any): Observable<any>{

    const lessonToSave = Object.assign({}, lesson, {courseId});
    const newLessonKey = this.sdbDb.child('lessons').push().key;

    let dataToSave = {};
    dataToSave[`lessons/${newLessonKey}`] = lessonToSave;
    dataToSave[`lessonsPerCourse/${courseId}/${newLessonKey}`] = true;

    return this.firebaseUpdate(dataToSave);

  }

  firebaseUpdate(data) {
    const subject = new Subject();

    this.sdbDb.update(data)
      .then(
        val => {
          subject.next(val);
          subject.complete();
        },
        err => {
          subject.error(err);
          subject.complete();
        }
      );

    return subject.asObservable();
  }

}
