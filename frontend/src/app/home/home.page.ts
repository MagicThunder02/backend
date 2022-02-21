import { Component } from '@angular/core';
import { BackendService } from 'src/services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  cards = []

  constructor(public backend: BackendService) {

  }

}
