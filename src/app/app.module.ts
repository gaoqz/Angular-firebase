import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";

import {routerConfig} from "./router.config";

import {AngularFireAuthModule} from "angularfire2/auth/auth.module";
import {AngularFireDatabaseModule} from "angularfire2/database/database.module";
import {firebaseConfig} from "../environments/firebase.config";
import {AngularFireModule} from "angularfire2";

import {HomeComponent} from './home/home.component';
import {LessonListComponent} from './lesson-list/lesson-list.component';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {CoursesComponent} from './courses/courses.component';
import {CourseDetailComponent} from './course-detail/course-detail.component';
import {LessonDetailComponent} from './lesson-detail/lesson-detail.component';
import {NewLessonComponent} from './new-lesson/new-lesson.component';

import {CourseService} from "./shared/model/course.service";
import {LessonsService} from "./shared/model/lessons.service";
import {SafeUrlPipe} from './shared/security/safe-url.pipe';
import {LessonFormComponent} from './lesson-form/lesson-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LessonListComponent,
    TopMenuComponent,
    LoginComponent,
    RegisterComponent,
    CoursesComponent,
    CourseDetailComponent,
    LessonDetailComponent,
    SafeUrlPipe,
    NewLessonComponent,
    LessonFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routerConfig)
  ],
  providers: [LessonsService, CourseService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
