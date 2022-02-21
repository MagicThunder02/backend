import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { ScrapeService } from 'src/scrape.service';


@Injectable()
export class CardFinderService {
  constructor(public httpService: HttpService, public scrapeService: ScrapeService) { }

  public getAutocomplete(search: string) {
    const URL = `https://api.scryfall.com/cards/autocomplete?q=${search}`
    return this.httpService.get(URL).pipe(
      //httpservice return data:{numcards: 2, data: [nomi delle carte] }
      map(response => response.data.data)
    );
  }

  public getCard(search: string) {
    const URL = `https://api.scryfall.com/cards/search?q=${search}`
    return this.httpService.get(URL).pipe(
      map(async response => {
        // console.log(response.data, response.data.data[0].purchase_uris.cardmarket);
        let price = await this.scrapeService.scapeData(response.data.data[0].purchase_uris.cardmarket)
        response.data.data[0].prices.cardmarket = price
        // console.log(response.data.data[0].prices.cardmarket);
        return response.data
      }

      )
    );
  }

}
