export type ContractType = {
  address: string;
  locked: TokenUnit;
  nodes: number;
  apr: number;
  commission: number;
  delegationCap: TokenUnit;
};

export type ValidatorDetailsState = {
  loading: boolean;
  exists: boolean;
  isProvider: boolean;
  contract: ContractType | null;
}
