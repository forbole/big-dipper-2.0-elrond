export type ProfileType = {
  name: string;
  identifier: string;
  description: string;
  imageUrl: string;
}

export type TokenDetailsState = {
  loading: boolean;
  exists: boolean;
  profile: ProfileType;
}
