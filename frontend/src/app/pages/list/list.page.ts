import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BackendService } from 'src/services/backend.service';
import { GlobalService } from 'src/services/global.service';
import { AddModalComponent } from './add-modal/add-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {

  cards = []

  constructor(
    private backend: BackendService,
    private modalController: ModalController
  ) {

  }

  ionViewWillEnter() {
    this.listCards()
  }

  public listCards() {
    this.backend.list().subscribe(data => {
      console.log(data);
      this.cards = data
    })
  }

  public deleteCards(name) {
    this.backend.delete(name).subscribe(data => {
      console.log(data);
    })

    this.listCards()
  }


  async presentAddModal() {
    const modal = await this.modalController.create({
      component: AddModalComponent,
      cssClass: 'fullscreen',

    });
    modal.onDidDismiss().then((result) => {
      console.log(result);
      if (result.data == "OK") {
        //carica la nuova card
        this.listCards()
        //dopo tre secondi carica il prezzo
        setTimeout(() => {
          this.listCards()
        }, 5000);
      }

    });

    return await modal.present();
  }


  async presentEditModal(card) {
    const modal = await this.modalController.create({
      component: EditModalComponent,
      cssClass: 'fullscreen',
      componentProps: {
        card: card
      }
    });

    modal.onDidDismiss().then((result) => {
      console.log(result);
      if (result.data == "OK") {
        //carica la nuova card
        this.listCards();
      }
    });

    return await modal.present();
  }




}
