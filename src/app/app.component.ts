import { Component , OnInit} from '@angular/core';
import {database, initializeApp} from 'firebase';
import 'rxjs/Rx';
import {Router, NavigationEnd} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  // currentUrl: string;
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if ((event instanceof NavigationEnd)) {
        document.body.scrollTop = 0;
        // this.currentUrl = this.router.url;
      }
    })
  }
}
