import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type ClientDocument = HydratedDocument<Client>

@Schema({ versionKey: false, timestamps: { createdAt: true, updatedAt: true } })
export class Client {
  @Prop({ unique: true })
  ci: string

  @Prop()
  firstName: string

  @Prop()
  lastName: string

  @Prop()
  sugarPercent: number

  @Prop()
  fatPercent: number

  @Prop()
  oxygenPercent: number
}
export const ClientSchema = SchemaFactory.createForClass(Client)
