export type BlockType = {
  block: number; // round
  timestamp: number;
  txs: number;
  shard: number;
  size: number;
  hash: string;
}

export type BlockState = {
  page: number;
  itemLoading: boolean;
  items: BlockType[];
}
