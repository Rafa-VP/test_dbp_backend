import { Document } from 'mongoose'
export interface IClient extends Document {
  readonly ci: string
  readonly firstName: string
  readonly lastName: string
  readonly sugarPercent: number
  readonly fatPercent: number
  readonly oxygenPercent: number
}
