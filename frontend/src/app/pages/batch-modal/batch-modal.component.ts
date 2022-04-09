import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { BackendService } from 'src/services/backend.service';

@Component({
  selector: 'app-batch-modal',
  templateUrl: './batch-modal.component.html',
  styleUrls: ['./batch-modal.component.scss'],
})
export class BatchModalComponent implements OnInit {

  public batch: string = ""
  @Input() updater

  constructor(public modalController: ModalController, private backend: BackendService, private alertController: AlertController) { }

  ngOnInit() { }

  public addBatch() {

    console.log(this.batch);

    //se il batch è valido lo esegue
    if (this.checkBatch()) {
      this.pushBatch()
    }
    //se il batch non è valido lo blocca prima che possa essere inviato
    else {
      this.presentBatchAlert()
    }
  }

  private checkBatch() {
    //separa la stringa in righe
    let list = this.batch.split("\n")

    //toglie l'ultimo elemento se è vuoto
    if (list[list.length - 1] == "") { list.pop() }

    //se ogni riga ha come prima cosa un numero ritorna vero
    if (list.every(line => !isNaN(parseFloat(line)))) {
      return true
    } else {
      return false
    }

  }

  private pushBatch() {
    //splitto e rimuovo l'elemento vuoto
    let list = this.batch.split("\n")
    if (list[list.length - 1] == "") { list.pop() }

    //per ogni riga estraggo soglia e prezzo

    list.forEach(line => {
      let threshold = parseFloat(line);
      let name = line.replace(threshold.toString(), "").trim()

      this.modalController.dismiss()

      //creo la carta
      this.backend.createCard(name, threshold).subscribe((result) => {

        console.log(result);

        //gestisce gli errori e li inserisce nei rispettivi array
        switch (result.result) {
          case "CARD_NOT_FOUND":
            this.presentNotFoundAlert(name)

            break;
          case "PRICE_NOT_FOUND":
            this.presentPriceAlert(name)
            break;

          case "OK":
          default:
            this.updater.emit(result.message)
            break;
        }
      })
    })

  }

  async presentBatchAlert() {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: 'Formato del Batch non valido',
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
