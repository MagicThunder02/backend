
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './schemas/card.schema';
import { DBService } from './database.service';
import { DBController } from './database.controller';


@Module({
  imports: [MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }])],
  controllers: [DBController],
  providers: [DBService],
  exports: [DBService]
})
export class DBModule { }