import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {

    let darkmode = localStorage.getItem('darkmode')
    console.log(darkmode);

    if (darkmode == "true") {
      document.body.setAttribute('color-theme', 'dark');
    }
    else {
      document.body.setAttribute('color-theme', 'light');
    }
  }

}
