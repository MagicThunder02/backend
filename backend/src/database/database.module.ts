
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './schemas/card.schema';
import { DBService } from './database.service';
import { DBController } from './database.controller';
import { ScrapeService } from 'src/scrape.service';
import { HttpModule } from '@nestjs/axios';
import { CardService } from 'src/cards/cards.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]), HttpModule],
  controllers: [DBController],
  providers: [DBService, ScrapeService, CardService],
  exports: [DBService]
})
export class DBModule { }