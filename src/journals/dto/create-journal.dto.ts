import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateJournalDto {
  @IsNotEmpty({ message: 'Kode saham tidak boleh kosong' })
  @IsString()
  ticker: string;

  @IsNotEmpty()
  @IsEnum(['BUY', 'SELL'], { message: 'Tipe harus BUY atau SELL' })
  type: 'BUY' | 'SELL';

  @IsNotEmpty()
  @IsNumber({}, { message: 'Harga harus berupa angka' })
  price: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Jumlah lot harus berupa angka' })
  lots: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
