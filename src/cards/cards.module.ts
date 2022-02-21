
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsService } from 'src/cards/cards.service';
import { Card, CardSchema } from './schemas/card.schema';
import { CardsController } from './cards.controller';


@Module({
  imports: [MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }])],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService]
})
export class CardsModule { }