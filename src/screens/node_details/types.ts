export type ProfileType = {
  name: string;
  version: string;
}

export type NodeDetailsState = {
  loading: boolean;
  exists: boolean;
  profile: ProfileType;
}
