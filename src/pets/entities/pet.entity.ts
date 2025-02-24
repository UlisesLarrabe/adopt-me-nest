import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type PetsDocument = HydratedDocument<Pet>;

@Schema()
export class Pet {
  @Prop()
  name: string;
  @Prop()
  birthDate: Date;
  @Prop({ default: false })
  adopted: boolean;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    default: [],
  })
  owner: object[];
  @Prop()
  specie: string;
  @Prop()
  image?: string;
}

export const PetsSchema = SchemaFactory.createForClass(Pet);
