import { Component, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BackendService } from 'src/services/backend.service';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { BatchModalComponent } from '../batch-modal/batch-modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {

  cards = []
  updater: EventEmitter<any> = new EventEmitter()

  constructor(
    private backend: BackendService,
    private modalController: ModalController,

  ) {
    this.updater.subscribe(event => {
      let card = this.cards.find(card => card._id == event._id)
      if (card) {
        console.log("updated", card, event);
        card = event
      }
      else {
        console.log("added", card, event);
        this.cards.push(event)
      }

    })
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
    this.backend.deleteCard(name).subscribe(data => {
      console.log(data);
    })

    this.listCards()
  }


  async presentAddModal() {
    const modal = await this.modalController.create({
      component: AddModalComponent,
      cssClass: 'fullscreen',
      componentProps: {
        updater: this.updater
      }

    });
    modal.onDidDismiss().then((result) => {

    });

    return await modal.present();
  }


  async presentEditModal(card, item) {
    const modal = await this.modalController.create({
      component: EditModalComponent,
      cssClass: 'fullscreen',
      componentProps: {
        card: card,
        updater: this.updater
      }

    });

    return await modal.present().then(() => item.close());
  }

  async presentBatchModal() {
    const modal = await this.modalController.create({
      component: BatchModalComponent,
      cssClass: 'fullscreen',
      componentProps: {
        updater: this.updater
      }
    });

    return await modal.present();
  }




}
