
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScrapeService } from 'src/scrape.service';
import { CardService } from './cards.service';
import { CardsController } from './cards.controller';


@Module({
  imports: [HttpModule],
  controllers: [CardsController],
  providers: [CardService, ScrapeService],
  exports: [CardService]
})
export class CardsModule { }