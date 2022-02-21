import { Body, Controller, Get, Query, Post } from '@nestjs/common';
import { CardFinderService } from './cards-finder.service';

@Controller('cards')
export class CardsController {

  constructor(private cardFinderService: CardFinderService) { }


  @Get('autocomplete')
  async findAutocomplete(@Query() query) {
    console.log(query.search);
    return await this.cardFinderService.getAutocomplete(query.search)
  }

  @Get('search')
  async searchCard(@Query() query) {
    console.log(query.search);
    return await this.cardFinderService.getCard(query.search)
  }

}
