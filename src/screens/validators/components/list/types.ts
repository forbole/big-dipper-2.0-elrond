export type ValidatorType = {
  name: string;
  identity: string;
  imageUrl: string;
  stake: TokenUnit;
  stakePercent: number;
  provider: boolean;
  nodes: number;
}

export type ValidatorsState = {
  loading: boolean;
  exists: boolean;
  tab: number;
  sortKey: string;
  sortDirection: 'asc' | 'desc';
  items: ValidatorType[];
}

// export type ItemType = Override<ValidatorType, { validator: AvatarName }>;
