import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, filter, map, Observable } from 'rxjs';
import { ScrapeService } from 'src/scrape.service';


@Injectable()
export class CardService {
  constructor(public httpService: HttpService, public scrapeService: ScrapeService) { }

  public getAutocomplete(search: string) {

    console.log("searching autocomplete");
    const URL = `https://api.scryfall.com/cards/autocomplete?q=${search}`

    return this.httpService.get(URL).pipe(
      //httpservice return data:{numcards: 2, data: [nomi delle carte] }
      map(response => response.data.data),
      catchError(async (error) => console.log(error))
    );
  }

  public getCardLink(search: string): Observable<any> {
    const URL = `https://api.scryfall.com/cards/search?q=${search}`
    return this.httpService.get(URL).pipe(

      //returns only the cardmarket link
      map(response => {

        if (response.data.data.length != 1) {
          response.data.data = response.data.data.filter(card => card.name.toLowerCase() == search.toLowerCase())
          // console.log('result', response.data);
        }

        return response.data.data[0]
      }),

      catchError(async error => {
        console.log(`Error searching ${search}`)
        return "CARD_NOT_FOUND"
      })
    );
  }

  public getCard(search: string): Observable<any> {
    const URL = `https://api.scryfall.com/cards/search?q=${search}`
    return this.httpService.get(URL).pipe(

      //returns only the cardmarket link
      map(response => response.data),

      catchError(async (error) => console.log(error))
    );
  }

}
