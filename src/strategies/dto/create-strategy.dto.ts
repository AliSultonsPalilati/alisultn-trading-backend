import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export enum StrategyCategory {
  SCALPING = 'SCALPING',
  SWING = 'SWING',
  IPO = 'IPO',
}

export class CreateStrategyDto {
  @IsNotEmpty()
  @IsEnum(StrategyCategory)
  category: StrategyCategory;

  @IsNotEmpty()
  @IsString()
  ticker: string;

  @IsOptional()
  @IsString()
  reason?: string; // Di frontend ini adalah 'entryReason' atau 'catatan'

  @IsOptional()
  @IsNumber()
  targetPrice?: number;

  @IsOptional()
  @IsNumber()
  stopLoss?: number;

  @IsOptional()
  @IsNumber()
  ipoPrice?: number; // Di frontend ini adalah 'hargaPenawaran'

  @IsOptional()
  @IsNumber()
  ipoLots?: number; // Di frontend ini adalah 'jumlahLotPesanan'

  @IsOptional()
  @IsString()
  ipoStatus?: string; // Di frontend ini adalah 'statusAlokasi'
}
