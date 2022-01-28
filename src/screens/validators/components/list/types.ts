export type TabType = {
  id: number,
  key: string,
  component?: React.ReactNode;
}

export type ValidatorType = {
  validator: AvatarName;
  stake: TokenUnit;
  stakePercent: number;
  nodes: number;
}

export type SearchType = string;

export type ValidatorsState = {
  loading: boolean;
  exists: boolean;
  tab: number;
  search: SearchType;
  // sortKey: string;
  // sortDirection: 'asc' | 'desc';
  identities: {
    [key: string]: AvatarName;
  }
  validators: ValidatorType[];
}
