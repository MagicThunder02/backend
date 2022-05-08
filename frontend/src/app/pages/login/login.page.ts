import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/services/backend.service';
import CryptoJS from 'crypto-js';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {

  public email: string = ''
  public password: string

  constructor(
    public router: Router,
    private backendService: BackendService,
    private alertController: AlertController
  ) { }

  ionViewWillEnter() {
    // this.email = localStorage.getItem('email').trim()
    // console.log(this.email);
  }

  public login() {
    if (this.email) {
      localStorage.setItem('email', this.email.trim())
    }

    this.backendService.getUser(this.email.trim()).subscribe(user => {
      //se l'utente esiste
      if (user != null) {

        //controlla le password
        if (CryptoJS.SHA1(this.password) == user.password) {
          this.router.navigateByUrl('/list')
        }
        else {
          this.presentPasswordError()
        }
      }
      //se non esiste
      else {
        this.presentRegisteringAlert()
      }
    })
  }

  private register() {
    this.backendService.createUser(this.email.trim(), this.password.trim()).subscribe(user => {
      this.router.navigateByUrl('/list')
    })
  }

  async presentPasswordError() {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: `Password Errata`,
      mode: "ios",
      buttons: ["OK"]
    })
    await alert.present();
  }

  async presentRegisteringAlert() {
    const alert = await this.alertController.create({
      header: 'Utente non presente',
      message: `Vuoi registrarti con questa email e password?`,
      mode: "ios",
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "OK",
          handler: () => {
            this.register()
          }
        }
      ]
    });
    await alert.present();
  }
}
