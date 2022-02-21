
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScrapeService } from 'src/scrape.service';
import { CardFinderService } from './cards-finder.service';
import { CardsController } from './cards.controller';


@Module({
  imports: [HttpModule],
  controllers: [CardsController],
  providers: [CardFinderService, ScrapeService],
  exports: [CardFinderService]
})
export class CardsModule { }