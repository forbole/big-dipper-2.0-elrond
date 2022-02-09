export const fakeData = {
  bls: '079c54138a2268197d1067f8d2395322e9893028e92def2ff8e2040c6f078ed38c48645be97d29d1ed5ca03c1ab48f079413a158f6734767625d808898b4704a65ba657d2996330b475d0fefd3aebe159042a24cde6ef8265302d8cd9d152b80',
  name: 'SA-THC10-11',
  version: 'v1.2.38.0',
  identity: 'staking_agency',
  rating: 100,
  tempRating: 100,
  ratingModifier: 1.2,
  shard: 4294967295,
  type: 'validator',
  status: 'waiting',
  online: true,
  nonce: 8028658,
  instances: 1,
  owner: 'erd1yj4jlay9rrzahran7jxk89gsg9frxw6l5qyca9dqhp8c4f5e0vdsytwkvl',
  provider: 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhllllsajxzat',
  stake: '2500000000000000000000',
  topUp: '622570064570773258217',
  locked: '3122570064570773258217',
  leaderFailure: 0,
  leaderSuccess: 0,
  validatorFailure: 0,
  validatorIgnoredSignatures: 0,
  validatorSuccess: 2,
  position: 0,
};

export const fakeData2 = {
  bls: '029e452976ab13bc81d42cd0e619163183fe20a0ac5fafa14f3c4db27a110b9b9d84fe85daefbbe80418afce800f9c0df1a9f82b207569ef674d00181a0a2b6a9c28e013af1e201210debdde414603df9c1dd19fae0f80f678f538d074abdd81',
  name: 'flying-basalt-1-UK0',
  version: 'v1.2.38.0',
  ratingModifier: 0,
  shard: 0,
  type: 'observer',
  online: true,
  nonce: 8043073,
  instances: 1,
  position: 0,
};

export const fakeIdentity = {
  locked: '568656056696916643436800',
  distribution: {
    erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhllllsajxzat: 1,
  },
  identity: 'staking_agency',
  avatar: 'https://s3.amazonaws.com/keybase_processed_uploads/1c615712df066d5f4aa15cf40aff8a05_360_360.jpg',
  description: 'The smart way to manage your stakes',
  name: 'Staking Agency',
  website: 'http://staking.agency',
  location: 'Romania',
  score: 21839,
  validators: 182,
  stake: '455000000000000000000000',
  topUp: '113656056696916643436800',
  providers: [
    'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhllllsajxzat',
  ],
  stakePercent: 5.12,
  apr: 16.19,
  rank: 3,
};

export const fakeRound = {
  blockWasProposed: true, round: 8044422, shard: 2, epoch: 558, timestamp: 1644384132,
};

export const fakeRounds = Array(100).fill(fakeRound);
