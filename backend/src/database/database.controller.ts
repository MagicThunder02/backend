import { Body, Controller, Get, Query, Post } from '@nestjs/common';
import { map } from 'rxjs';
import { CardService } from 'src/cards/cards.service';
import { ScrapeService } from 'src/scrape.service';
import { DBService } from './database.service';
import { CardDto } from './dto/card.dto';
import { CreateCardDto } from './dto/create-card.dto';

@Controller('db')
export class DBController {

  constructor(private readonly dbService: DBService, private cardService: CardService, private scrapeService: ScrapeService) { }

  @Get('list')
  async findAll() {
    return await this.dbService.findAll()
  }

  @Get('email')
  async findByEmail(@Query() query) {
    console.log("Effettuata richiesta da", query.email);
    return await this.dbService.findByEmail(query.email)
  }

  @Post('create')
  async create(@Body() cardDto: CardDto) {
    console.log("create INIT", cardDto);


    //creo la carta nel db
    let log = await this.dbService.create(cardDto)

    //richiedo il link a scryfall
    this.cardService.getCardLink(cardDto.name).subscribe(async link => {
      console.log(link);

      //get link and card price
      cardDto.link = link
      cardDto.price = await this.scrapeService.scapeData(link)

      //update the db with the prices and links
      this.dbService.update(cardDto)
    })

  }

  @Post('delete')
  async delete(@Body() body) {
    console.log(body);
    return await this.dbService.delete(body);
  }
}
