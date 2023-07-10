import {
  Injectable,
  NotFoundException,
  ConflictException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IClient } from '../interface/client.interface'
import { CreateClientDto } from '../dto/create-client.dto'
import { UpdateClientDto } from '../dto/update-client.dto'

@Injectable()
export class ClientService {
  constructor(@InjectModel('Client') private clientModel: Model<IClient>) {}
  async create(createClientDto: CreateClientDto): Promise<IClient> {
    const newClient = await new this.clientModel(createClientDto)
    const existClient = await this.clientModel
      .findOne({
        ci: createClientDto.ci
      })
      .exec()
    if (existClient)
      throw new ConflictException('Client C.I is already registered')
    return newClient.save()
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<IClient> {
    const client = await this.clientModel.findByIdAndUpdate(
      id,
      updateClientDto,
      { new: true }
    )
    if (!client) {
      throw new NotFoundException(`Client #${id} not found!`)
    }
    return client
  }

  async findAll(): Promise<IClient[]> {
    const clientData = await this.clientModel.find()
    if (!clientData || clientData.length == 0) {
      throw new NotFoundException('Client data not found!')
    }
    return clientData
  }

  async findOne(ci: string): Promise<IClient> {
    const client = await this.clientModel.findOne({ ci }).exec()
    if (!client) {
      throw new NotFoundException('Client not found!')
    }
    return client
  }

  async delete(clientId: string): Promise<IClient> {
    const deletedClient = await this.clientModel.findByIdAndDelete(clientId)
    if (!deletedClient)
      throw new NotFoundException(`Client #${clientId} not found`)
    return deletedClient
  }
}
