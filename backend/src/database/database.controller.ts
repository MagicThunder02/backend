import { Body, Controller, Get, Query, Post, HttpException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { catchError, map } from 'rxjs';
import { CardService } from 'src/cards/cards.service';
import { ScrapeService } from 'src/scrape.service';
import { DBService } from './database.service';
import { CardDto } from './dto/card.dto';

@Controller('db')
export class DBController {

  constructor(private readonly dbService: DBService, private cardService: CardService, private scrapeService: ScrapeService) { }

  @Get('list')
  async findAll() {
    console.log("Listing");
    return await this.dbService.findAll()
  }

  @Get('email')
  async findByEmail(@Query() query) {
    console.log("Effettuata richiesta da", query.email);
    return await this.dbService.findByEmail(query.email)
  }

  @Post('create')
  async create(@Body() cardDto: CardDto) {

    //richiedo il link a scryfall
    return this.cardService.getCardLink(cardDto.name).pipe(
      map(async card => {

        cardDto.link = card.purchase_uris.cardmarket
        cardDto.name = card.name

        if (cardDto.link != "CARD_NOT_FOUND") {
          //ottengo il prezzo
          let price = await this.scrapeService.scrapeData(cardDto.link)

          //se il prezzo è trovato crea il record
          if (price != "PRICE_NOT_FOUND") {
            cardDto.price = price
            console.log("Created", cardDto.name);
            return { "statusCode": 200, result: "OK", message: await this.dbService.create(cardDto) }

          } else {
            return { "statusCode": 200, result: "PRICE_NOT_FOUND" }
          }
        }
        else {
          return { "statusCode": 200, result: "CARD_NOT_FOUND" }
        }


      })
    )
  }

  @Post('update')
  async update(@Body() cardDto: CardDto) {

    cardDto.price = await this.scrapeService.scrapeData(cardDto.link)

    console.log("Updated ", cardDto.name);

    //update the db with the prices and links


    return await this.dbService.update(cardDto)
  }

  @Post('delete')
  async delete(@Body() body) {
    // console.log(body);
    console.log("cancellata", body);
    return await this.dbService.delete(body);
  }
}
