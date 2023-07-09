import { Injectable, NotFoundException } from '@nestjs/common'
import { IUser } from '../interface/user.interface'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}
  async findOne(username: string): Promise<IUser> {
    const user = await this.userModel.findOne({ username }).exec()
    if (!user) {
      throw new NotFoundException('User not found!')
    }
    return user
  }
}
