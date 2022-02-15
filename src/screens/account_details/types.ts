export type ProfileType = {
  address: string;
  username: string;
}

export type AccountDetailsType = {
  loading: boolean;
  exists: boolean;
  profile: ProfileType;
}
