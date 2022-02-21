import { Body, Controller, Get, Query, Post } from '@nestjs/common';
import { DBService } from './database.service';
import { CardFinderService } from '../cards/cards-finder.service';
import { CreateCardDto } from './dto/create-card.dto';

@Controller('db')
export class DBController {
  public rawData: string
  public cardPrice: string
  public cardName: string

  constructor(private readonly cardService: DBService) { }

  @Get('listDB')
  async findAll() {
    // let cards = await this.cardService.findAll()
    // console.log(cards);
    return await this.cardService.findAll()
  }

  @Get('email')
  async findByEmail(@Query() query) {
    console.log(query.email);
    return await this.cardService.findByEmail(query.email)
  }

  @Post('create')
  async create(@Body() CreateCardDto: CreateCardDto) {
    await this.cardService.create(CreateCardDto);
  }

  @Post('delete')
  async delete(@Body() body) {
    console.log(body.link);
    await this.cardService.delete(body.link);
  }
}
