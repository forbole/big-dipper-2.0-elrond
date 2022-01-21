export type OverviewType = {
  block: number; // round
  hash: string;
  proposer: string;
  timestamp: number;
  txs: number;
}

export type BlockDetailsState = {
  loading: boolean;
  exists: boolean;
  overview: OverviewType;
}
