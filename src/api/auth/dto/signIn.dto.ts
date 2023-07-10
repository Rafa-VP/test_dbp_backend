import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class SignInDto {
  @ApiProperty({ required: true, readOnly: true })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({ required: true, readOnly: true })
  @IsString()
  @IsNotEmpty()
  password: string
}
