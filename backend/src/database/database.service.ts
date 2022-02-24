import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card, CardDocument } from './schemas/card.schema';
import { CreateCardDto } from './dto/create-card.dto';
import { CardDto } from './dto/card.dto';


@Injectable()
export class DBService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) { }

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const createdCard = new this.cardModel(createCardDto);
    return createdCard.save();
  }

  async update(cardDto: CardDto): Promise<any> {
    return this.cardModel.updateMany({ email: cardDto.email, name: cardDto.name }, cardDto).exec();
  }

  async delete(body): Promise<any> {
    return this.cardModel.deleteMany(body).exec();
  }

  async findAll(): Promise<Card[]> {
    return this.cardModel.find().exec();
  }

  async findByEmail(email): Promise<Card[]> {
    return this.cardModel.find({ email: email }).exec();
  }
}
