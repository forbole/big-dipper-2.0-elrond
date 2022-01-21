export type OverviewType = {
  block: number; // round
  hash: string;
  proposer: string;
  timestamp: number;
  txs: number;
  size: number;
  shard: number;
  gasUsed: number;
  gasProvided: number;
  gasRefunded: number;
  gasPenalized: number;
}

export type BlockDetailsState = {
  loading: boolean;
  exists: boolean;
  overview: OverviewType;
}
