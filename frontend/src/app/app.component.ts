import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private global: GlobalService) {

    let darkmode = localStorage.getItem('darkmode')

    if (darkmode == "true") {
      this.global.darkmode = 'true'
      document.body.setAttribute('color-theme', 'dark');
    }
    else {
      this.global.darkmode = 'false'
      document.body.setAttribute('color-theme', 'light');
    }
  }

}
