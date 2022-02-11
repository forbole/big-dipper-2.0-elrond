export type ContractType = {
  address: string;
  locked: TokenUnit;
  nodes: number;
  apr: number;
  commission: number;
  delegationCap: TokenUnit;
};

export type StakeType = {
  totalStaked: TokenUnit;
  locked: TokenUnit;
  stakePercent: number;
  stake: TokenUnit;
  topUp: TokenUnit;
}

export type ProfileType = {
  name: string;
  imageUrl: string;
  description: string;
}

export type ValidatorDetailsState = {
  loading: boolean;
  exists: boolean;
  isProvider: boolean;
  contract: ContractType | null;
  stake: StakeType;
  profile: ProfileType;
}
