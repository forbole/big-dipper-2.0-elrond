export type OverviewType = {
  hash: string;
  receiverBlockHash: string;
  receiverShard: number;
  senderBlockHash: string;
  senderShard: number;
  timestamp: number;
  type: string;
}

// export type MiniBlockType = string;
// export type ConsensusType = string;

export type BlockDetailsState = {
  loading: boolean;
  exists: boolean;
  overview: OverviewType;
  // miniBlocks: MiniBlockType[];
  // consensus: ConsensusType[];
}
