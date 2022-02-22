import { Component } from '@angular/core';
import { BackendService } from 'src/services/backend.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {

  cards = []

  constructor(public backend: BackendService) {

  }

}
