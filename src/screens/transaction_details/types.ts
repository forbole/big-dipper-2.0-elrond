export type OverviewType = {
  hash: string;
  fromShard: number;
  toShard: number;
  from: string;
  to: string;
  timestamp: number;
  status: string;
  miniblockHash: string;
}

export type TransactionDetailsState = {
  loading: boolean;
  exists: boolean;
  overview: OverviewType;
  data: string;
  // transactions: TransactionType[];
}
