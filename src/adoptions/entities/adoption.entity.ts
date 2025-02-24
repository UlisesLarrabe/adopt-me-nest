import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type AdoptionDocument = HydratedDocument<Adoption>;

@Schema()
export class Adoption {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }] })
  owner: object;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pets' }] })
  pet: object;
}

export const AdoptionSchema = SchemaFactory.createForClass(Adoption);
