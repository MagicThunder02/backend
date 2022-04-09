import { Component } from '@angular/core';
import { Router } from '@angular/router';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {

  public email: string
  public password: string

  constructor(public router: Router) { }

  ionViewWillEnter() {
    // this.email = localStorage.getItem('email').trim()
    // console.log(this.email);
  }

  public login() {
    if (this.email) {
      localStorage.setItem('email', this.email.trim())
    }

    this.router.navigateByUrl('/list')

  }
}
