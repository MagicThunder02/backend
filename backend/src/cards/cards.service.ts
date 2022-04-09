import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, filter, map, Observable } from 'rxjs';
import { ScrapeService } from 'src/scrape.service';
import { InjectModel } from '@nestjs/mongoose';
import { CardDto } from 'src/database/dto/card.dto';
import { Card, CardDocument } from 'src/database/schemas/card.schema';


@Injectable()
export class CardService {
  constructor(public httpService: HttpService, public scrapeService: ScrapeService, @InjectModel(Card.name) private cardModel: Model<CardDocument>) { }


  async create(cardDto: CardDto): Promise<Card> {
    const createdCard = new this.cardModel(cardDto);
    return await createdCard.save();
  }

  async update(cardDto: CardDto): Promise<any> {
    return this.cardModel.findOneAndUpdate({ _id: cardDto._id }, cardDto, { returnDocument: "after" }).exec();
  }

  async delete(body): Promise<any> {
    return this.cardModel.deleteMany(body).exec();
  }

  async findAll(): Promise<Card[]> {
    return this.cardModel.find().exec();
  }

  async findByEmail(email): Promise<Card[]> {
    return this.cardModel.find({ email: email }).exec();
  }

  //---------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------

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
