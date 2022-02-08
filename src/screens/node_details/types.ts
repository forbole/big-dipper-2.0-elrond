export type ProfileType = {
  name: string;
  version: string;
  pubkey: string;
  validator: string;
}

export type NodeDetailsState = {
  loading: boolean;
  exists: boolean;
  profile: ProfileType;
}
