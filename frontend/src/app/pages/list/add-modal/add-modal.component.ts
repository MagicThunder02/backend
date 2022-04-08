import { Component, Input, OnInit } from '@angular/core';
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

      this.backend.create(this.cards[0], this.threshold).subscribe((result) => {
        console.log("finished", result);

        this.updater.emit(result)

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

}
