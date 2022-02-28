export type TabType = {
  id: number,
  key: string,
  component?: React.ReactNode;
}

export type ValidatorType = {
  validator: AvatarName;
  stake: TokenUnit;
  commission: number;
  nodes: number;
  apr: number;
  delegators: number;
}

export type SearchType = string;

export type ValidatorsState = {
  loading: boolean;
  exists: boolean;
  tab: number;
  search: SearchType;
  validators: ValidatorType[];
}
