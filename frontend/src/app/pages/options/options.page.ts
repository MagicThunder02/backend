import { Component } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: 'options.page.html',
  styleUrls: ['options.page.scss']
})
export class OptionsPage {

  public darkmode

  constructor() {
    this.darkmode = localStorage.getItem('darkmode')
  }

  public setDarkmode() {
    if (this.darkmode) {
      document.body.setAttribute('color-theme', 'dark');
      localStorage.setItem('darkmode', 'true');
    }
    else {
      document.body.setAttribute('color-theme', 'light');
      localStorage.setItem('darkmode', 'false');
    }

  }

}
