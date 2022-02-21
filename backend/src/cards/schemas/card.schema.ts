import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardDocument = Card & Document;

@Schema()
export class Card {
    @Prop()
    email: string;

    @Prop()
    link: string;

    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    threshold: number;
}

export const CardSchema = SchemaFactory.createForClass(Card);