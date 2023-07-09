import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
export type UserDocument = HydratedDocument<User>

@Schema({ versionKey: false, timestamps: { createdAt: true, updatedAt: true } })
export class User {
  @Prop()
  username: string

  @Prop()
  password: string
}
export const UserSchema = SchemaFactory.createForClass(User)
