import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsUUID,
  IsDateString,
  IsOptional,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ example: 'Kasun Perera' })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({ example: 'kasun@example.com' })
  @IsEmail()
  customerEmail: string;

  @ApiProperty({ example: '0771234567' })
  @IsString()
  @IsNotEmpty()
  customerPhone: string;

  @ApiProperty({ example: 'uuid-of-service' })
  @IsUUID()
  serviceId: string;

  @ApiProperty({ example: '2026-08-15', description: 'YYYY-MM-DD format' })
  @IsDateString()
  bookingDate: string;

  @ApiProperty({ example: '14:30', description: 'HH:mm format' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'bookingTime must be in HH:mm format',
  })
  bookingTime: string;

  @ApiPropertyOptional({ example: 'Please call before arriving' })
  @IsOptional()
  @IsString()
  notes?: string;
}