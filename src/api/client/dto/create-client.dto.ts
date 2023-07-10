import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  Max,
  Min,
  IsNumberString
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateClientDto {
  @ApiProperty({
    maxLength: 10,
    minLength: 10,
    required: true,
    readOnly: true
  })
  @IsNumberString()
  @MaxLength(10)
  @MinLength(10)
  @IsNotEmpty()
  readonly ci: string

  @ApiProperty({ required: true, readOnly: true })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string

  @ApiProperty({ required: true, readOnly: true })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string

  @ApiProperty({ required: true, readOnly: true, maximum: 100, minimum: 0 })
  @IsNumber()
  @IsNotEmpty()
  @Max(100)
  @Min(0)
  readonly sugarPercent: number

  @ApiProperty({ required: true, readOnly: true, maximum: 100, minimum: 0 })
  @IsNumber()
  @IsNotEmpty()
  @Max(100)
  @Min(0)
  readonly fatPercent: number

  @ApiProperty({ required: true, readOnly: true, maximum: 100, minimum: 0 })
  @IsNumber()
  @IsNotEmpty()
  @Max(100)
  @Min(0)
  readonly oxygenPercent: number
}
