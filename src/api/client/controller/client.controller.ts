import {
  Controller,
  Get,
  Res,
  Post,
  Body,
  HttpStatus,
  Delete,
  Param,
  Put,
} from '@nestjs/common'
import { Client } from '../schema/client.schema'
import { ClientService } from '../service/client.service'
import { CreateClientDto } from '../dto/create-client.dto'
import { Response } from 'express'
import { UpdateClientDto } from '../dto/update-client.dto'

@Controller('/client')
export class ClientController {
  constructor(private readonly clientSevice: ClientService) {}

  @Post()
  async create(@Res() res: Response, @Body() createClientDto: CreateClientDto) {
    try {
      const newClient = await this.clientSevice.create(createClientDto)
      return res.status(HttpStatus.CREATED).json({
        message: 'Client has been created successfully',
        newClient,
      })
    } catch (err: any) {
      res.status(err.status).json(err.response)
      return
    }
  }

  @Put('/:id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    try {
      const client = await this.clientSevice.update(id, updateClientDto)
      return res.status(HttpStatus.OK).json({
        message: 'Client has been successfully updated',
        client,
      })
    } catch (err: any) {
      return res.status(err.status).json(err.response)
    }
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Client[]> {
    try {
      const clients = await this.clientSevice.findAll()
      res.status(HttpStatus.OK).json(clients)
      return
    } catch (err: any) {
      res.status(err.status).json(err.response)
      return
    }
  }

  @Get('/:ci')
  async findOne(@Res() res: Response, @Param('ci') ci: string) {
    try {
      const client = await this.clientSevice.findOne(ci)
      res
        .status(HttpStatus.OK)
        .json({ message: 'Client found successfully', client })
      return
    } catch (err: any) {
      res.status(err.status).json(err.response)
      return
    }
  }

  @Delete('/:id')
  async delete(@Res() res: Response, @Param('id') clientId: string) {
    try {
      const deletedClient = await this.clientSevice.delete(clientId)
      res
        .status(HttpStatus.OK)
        .json({ message: 'Client deleted successfully', deletedClient })
      return
    } catch (err: any) {
      res.status(err.status).json(err.response)
      return
    }
  }
}
