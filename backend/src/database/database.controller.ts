import { Body, Controller, Get, Query, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { map } from 'rxjs';
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
      map(async link => {
        // console.log(link);

        //get link and card price
        cardDto.link = link
        cardDto.price = await this.scrapeService.scrapeData(link)

        //update the db with the prices and links
        console.log("Created", cardDto.name);

        return await this.dbService.create(cardDto)
      }))
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
