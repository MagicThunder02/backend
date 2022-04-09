import { Body, Controller, Get, Query, Post } from '@nestjs/common';
import { map } from 'rxjs';
import { CardDto } from 'src/database/dto/card.dto';
import { ScrapeService } from 'src/scrape.service';
import { CardService } from './cards.service';

@Controller('cards')
export class CardsController {

  constructor(private cardService: CardService, private scrapeService: ScrapeService) { }


  @Get('autocomplete')
  async findAutocomplete(@Query() query) {
    return await this.cardService.getAutocomplete(query.search)
  }

  @Get('search')
  async searchCard(@Query() query) {
    return await this.cardService.getCard(query.search)
  }

  @Get('list')
  async findAll() {
    console.log("Listing");
    return await this.cardService.findAll()
  }

  @Get('email')
  async findByEmail(@Query() query) {
    console.log("Effettuata richiesta da", query.email);
    return await this.cardService.findByEmail(query.email)
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
            return { "statusCode": 200, result: "OK", message: await this.cardService.create(cardDto) }

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


    return await this.cardService.update(cardDto)
  }

  @Post('delete')
  async delete(@Body() body) {
    // console.log(body);
    console.log("cancellata", body);
    return await this.cardService.delete(body);
  }

}
