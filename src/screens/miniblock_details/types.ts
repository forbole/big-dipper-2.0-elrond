export type OverviewType = {
  hash: string;
  receiverBlockHash: string;
  receiverShard: number;
  senderBlockHash: string;
  senderShard: number;
  timestamp: number;
  type: string;
}

export type BlockDetailsState = {
  loading: boolean;
  exists: boolean;
  overview: OverviewType;
  transactions: TransactionType[];
}
