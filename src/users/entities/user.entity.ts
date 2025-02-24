import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type UsersDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  first_name: string;
  @Prop({ required: true })
  last_name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: 'user' })
  role: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pets' }] })
  pets: object[];
}

export const UserSchema = SchemaFactory.createForClass(User);
