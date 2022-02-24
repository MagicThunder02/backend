import { Body, Controller, Get, Query, Post } from '@nestjs/common';
import { CardService } from './cards.service';

@Controller('cards')
export class CardsController {

  constructor(private cardService: CardService) { }


  @Get('autocomplete')
  async findAutocomplete(@Query() query) {
    console.log(query.search);
    return await this.cardService.getAutocomplete(query.search)
  }

  @Get('search')
  async searchCard(@Query() query) {
    console.log(query.search);
    return await this.cardService.getCard(query.search)
  }

}
