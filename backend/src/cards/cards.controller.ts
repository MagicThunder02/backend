import { Body, Controller, Get, Query, Post } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';

@Controller('cards')
export class CardsController {
  public rawData: string
  public cardPrice: string
  public cardName: string

  constructor(private readonly cardService: CardsService) { }

  @Get('list')
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
