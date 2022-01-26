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

export type DataType = string;

export type ActionType = {
  category: string;
  name: string;
  description: string;
}

export type OperationType = {
  action: string;
  sender: string;
  receiver: string;
  identifier: string;
}

export type TransactionDetailsState = {
  loading: boolean;
  exists: boolean;
  overview: OverviewType;
  data: DataType;
  action?: ActionType;
  operations: OperationType[];
}
