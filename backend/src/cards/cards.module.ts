
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScrapeService } from 'src/scrape.service';
import { CardService } from './cards.service';
import { CardsController } from './cards.controller';
import { Card, CardSchema } from 'src/database/schemas/card.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }])
  ],
  controllers: [CardsController],
  providers: [CardService, ScrapeService],
  exports: [CardService]
})
export class CardsModule { }