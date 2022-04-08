import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { BackendService } from 'src/services/backend.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {

  @Input() card
  @Input() updater

  constructor(
    public modalController: ModalController,
    private backend: BackendService,
    private alertController: AlertController,
  ) { }

  ngOnInit() { }

  public editCard() {

    console.log(this.card);

    if (!this.card.threshold) {
      this.presentNoThresholdAlert()
    }
    else {


      this.backend.update(this.card).subscribe(result => {
        console.log("finished", result);
        // this.modalController.dismiss(result)

        this.updater.emit(result)
      })
      this.modalController.dismiss()
    }

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
