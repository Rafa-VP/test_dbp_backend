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
  Header
} from '@nestjs/common'
import { Client } from '../schema/client.schema'
import { ClientService } from '../service/client.service'
import { CreateClientDto } from '../dto/create-client.dto'
import { Response } from 'express'
import { UpdateClientDto } from '../dto/update-client.dto'
import {
  ApiCreatedResponse,
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiBody,
  ApiProperty,
  getSchemaPath,
  ApiConflictResponse
} from '@nestjs/swagger'

@ApiTags('Client')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  schema: {
    example: {
      message: 'Unauthorized',
      statusCode: 401
    }
  }
})
@Controller('/client')
export class ClientController {
  constructor(private readonly clientSevice: ClientService) {}

  @Post()
  @ApiConflictResponse({
    schema: {
      example: {
        message: 'Client C.I is already registered',
        error: 'Conflict',
        statusCode: 409
      }
    }
  })
  @ApiCreatedResponse({
    schema: {
      example: {
        message: 'Client has been created successfully',
        client: {
          ci: '0850255086',
          firstName: 'Abraham',
          lastName: 'Lincoln',
          sugarPercent: 50,
          fatPercent: 65,
          oxygenPercent: 85,
          _id: '64ac61410545cf4896ef4278',
          createdAt: '2023-07-10T19:51:29.594Z',
          updatedAt: '2023-07-10T19:51:29.594Z'
        }
      }
    }
  })
  @ApiBody({
    schema: {
      example: {
        ci: '1231239876',
        firstName: 'Abraham',
        lastName: 'Lincoln',
        sugarPercent: 50,
        fatPercent: 65,
        oxygenPercent: 85
      }
    }
  })
  @Header('Content-Type', 'application/json')
  async create(@Res() res: Response, @Body() createClientDto: CreateClientDto) {
    try {
      const client = await this.clientSevice.create(createClientDto)
      return res.status(HttpStatus.CREATED).json({
        message: 'Client has been created successfully',
        client
      })
    } catch (err: any) {
      res.status(err.status).json(err.response)
      return
    }
  }

  @Put('/:_id')
  @ApiProperty({
    type: 'UpdateClientDto',
    items: { $ref: getSchemaPath(UpdateClientDto) }
  })
  @ApiNotFoundResponse({
    schema: {
      example: {
        message: 'Client not found!',
        error: 'Not Found',
        statusCode: 404
      }
    }
  })
  @ApiParam({ name: '_id', example: '5349b4ddd2781d08c09890f3' })
  @ApiOkResponse({
    schema: {
      example: {
        message: 'Client has been successfully updated',
        client: {
          _id: '64aad41df095a65fbf502b33',
          ci: '1234567654',
          firstName: 'Pesssi',
          lastName: 'Frionel',
          sugarPercent: 70,
          fatPercent: 69,
          oxygenPercent: 90,
          createdAt: '2023-07-09T15:37:01.486Z',
          updatedAt: '2023-07-10T19:43:30.211Z'
        }
      }
    }
  })
  @ApiBody({
    schema: {
      example: {
        firstName: 'Pesssi',
        lastName: 'Frionel'
      }
    }
  })
  @Header('Content-Type', 'application/json')
  async update(
    @Res() res: Response,
    @Param('_id') id: string,
    @Body() updateClientDto: UpdateClientDto
  ) {
    try {
      const client = await this.clientSevice.update(id, updateClientDto)
      return res.status(HttpStatus.OK).json({
        message: 'Client has been successfully updated',
        client
      })
    } catch (err: any) {
      return res.status(err.status).json(err.response)
    }
  }

  @Get()
  @ApiOkResponse({
    schema: {
      example: [
        {
          _id: '64abab1a695bfdb84309d4be',
          ci: '1231231231',
          firstName: 'Julian',
          lastName: 'Alvarez',
          sugarPercent: 50,
          fatPercent: 70,
          oxygenPercent: 70,
          createdAt: '2023-07-10T06:54:18.162Z',
          updatedAt: '2023-07-10T09:48:32.715Z'
        },
        {
          _id: '64abb5fb5418717c13738c91',
          ci: '3213211231',
          firstName: 'Frionel',
          lastName: 'Pessi',
          sugarPercent: 80,
          fatPercent: 89,
          oxygenPercent: 50,
          createdAt: '2023-07-10T07:40:43.500Z',
          updatedAt: '2023-07-10T09:52:09.762Z'
        },
        {
          _id: '64ac3d92baac285205b91f2b',
          ci: '7777777777',
          firstName: 'Frionaldo',
          lastName: 'Penaldo',
          sugarPercent: 50,
          fatPercent: 40,
          oxygenPercent: 90,
          createdAt: '2023-07-10T17:19:14.402Z',
          updatedAt: '2023-07-10T17:19:14.402Z'
        }
      ]
    }
  })
  @ApiNotFoundResponse({
    schema: {
      example: {
        message: 'Client data not found!',
        error: 'Not Found',
        statusCode: 404
      }
    }
  })
  @Header('Content-Type', 'application/json')
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
  @ApiParam({ allowEmptyValue: false, name: 'ci', example: '3213211231' })
  @ApiNotFoundResponse({
    schema: {
      example: {
        message: 'Client not found!',
        error: 'Not Found',
        statusCode: 404
      }
    }
  })
  @ApiOkResponse({
    schema: {
      example: {
        message: 'Client found successfully',
        client: {
          _id: '64ac3d92baac285205b91f2b',
          ci: '7777777777',
          firstName: 'Frionaldo',
          lastName: 'Penaldo',
          sugarPercent: 50,
          fatPercent: 40,
          oxygenPercent: 90,
          createdAt: '2023-07-10T17:19:14.402Z',
          updatedAt: '2023-07-10T17:19:14.402Z'
        }
      }
    }
  })
  @Header('Content-Type', 'application/json')
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

  @Delete('/:_id')
  @ApiNotFoundResponse({
    schema: {
      example: {
        message: 'Client not found!',
        error: 'Not Found',
        statusCode: 404
      }
    }
  })
  @ApiParam({ name: '_id', example: '5349b4ddd2781d08c09890f3' })
  @ApiOkResponse({
    schema: {
      example: {
        message: 'Client deleted successfully',
        client: {
          _id: '64abab1a695bfdb84309d4be',
          ci: '1231231231',
          firstName: 'Julian',
          lastName: 'Alvarez',
          sugarPercent: 50,
          fatPercent: 70,
          oxygenPercent: 70,
          createdAt: '2023-07-10T06:54:18.162Z',
          updatedAt: '2023-07-10T09:48:32.715Z'
        }
      }
    }
  })
  @Header('Content-Type', 'application/json')
  async delete(@Res() res: Response, @Param('_id') clientId: string) {
    try {
      const client = await this.clientSevice.delete(clientId)
      res
        .status(HttpStatus.OK)
        .json({ message: 'Client deleted successfully', client })
      return
    } catch (err: any) {
      res.status(err.status).json(err.response)
      return
    }
  }
}
