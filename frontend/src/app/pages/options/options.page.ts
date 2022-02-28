import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/services/global.service';

@Component({
  selector: 'app-options',
  templateUrl: 'options.page.html',
  styleUrls: ['options.page.scss']
})
export class OptionsPage {

  public darkmode

  constructor(public global: GlobalService, private router: Router) {
    this.darkmode = localStorage.getItem('darkmode')
  }

  public setDarkmode() {


    if (this.darkmode) {
      this.global.darkmode = 'false'
      document.body.setAttribute('color-theme', 'dark');
      localStorage.setItem('darkmode', 'true');
    }
    else {
      this.global.darkmode = 'true'
      document.body.setAttribute('color-theme', 'light');
      localStorage.setItem('darkmode', 'false');
    }

  }

  public logOut() {
    localStorage.removeItem('email')
    this.router.navigateByUrl('/login');
  }

}
