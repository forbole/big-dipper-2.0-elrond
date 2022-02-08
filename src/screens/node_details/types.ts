export type ProfileType = {
  name: string;
  version: string;
  pubkey: string;
  validator: string;
}

export type OverviewType = {
  shard: number;
  type: string;
  status: string;
  online: boolean;
  instances: number;
}

export type NodeDetailsState = {
  loading: boolean;
  exists: boolean;
  profile: ProfileType;
  overview: OverviewType;
}
