import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { BackendService } from 'src/services/backend.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {

  public cards = []
  public threshold: number
  @Input() updater

  constructor(public modalController: ModalController, private backend: BackendService, private alertController: AlertController) { }

  ngOnInit() { }

  public searchList(event) {
    this.backend.autocomplete(event.detail.value).subscribe(data => {
      this.cards = data
    })
  }

  public addCard() {

    console.log(this.cards, this.cards.length);

    if (this.cards.length != 1) {
      this.presentSelectCardAlert()
    }
    else if (!this.threshold) {
      this.presentNoThresholdAlert()
    }
    else {

      this.backend.createCard(this.cards[0], this.threshold).subscribe((result) => {
        switch (result.result) {
          case "CARD_NOT_FOUND":
            this.presentNotFoundAlert(this.cards[0])

            break;
          case "PRICE_NOT_FOUND":
            this.presentPriceAlert(this.cards[0])
            break;

          case "OK":
          default:
            console.log(result);
            this.updater.emit(result.message)
            break;
        }

      })
      this.modalController.dismiss()
    }

  }

  public toggleItem(name) {
    console.log(this.cards);
    this.cards = this.cards.filter(card => card == name)
  }

  async presentSelectCardAlert() {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: 'Seleziona una sola carta.',
      mode: "ios",
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentNoThresholdAlert() {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: 'Inserisci la soglia.',
      mode: "ios",
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentNotFoundAlert(name) {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: `La carta "${name}" non è stata trovata`,
      mode: "ios",
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentPriceAlert(name) {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: `Il prezzo della carta "${name}" non è stata trovato`,
      mode: "ios",
      buttons: ['OK']
    });
    await alert.present();
  }
}
