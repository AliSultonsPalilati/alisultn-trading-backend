export class CreateJournalDto {
  ticker: string;
  type: 'BUY' | 'SELL';
  price: number;
  lots: number;
  notes?: string;
  imageUrl?: string;
}
