import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  Max,
  Min,
  IsNumberString,
} from 'class-validator'
export class CreateClientDto {
  @IsNumberString()
  @MaxLength(10)
  @MinLength(10)
  @IsNotEmpty()
  readonly ci: string

  @IsString()
  @IsNotEmpty()
  readonly firstName: string

  @IsString()
  @IsNotEmpty()
  readonly lastName: string

  @IsNumber()
  @IsNotEmpty()
  @Max(100)
  @Min(0)
  readonly sugarPercent: number

  @IsNumber()
  @IsNotEmpty()
  @Max(100)
  @Min(0)
  readonly fatPercent: number

  @IsNumber()
  @IsNotEmpty()
  @Max(100)
  @Min(0)
  readonly oxygenPercent: number
}
