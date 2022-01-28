const d = {
  locked: '3034999999999999983222319',
  distribution: {
    direct: 1,
  },
  identity: 'elrondcom',
  avatar: 'https://s3.amazonaws.com/keybase_processed_uploads/0300ffbfa1a598da0a666f7e22990405_360_360.jpg',
  description: 'A highly scalable, fast and secure blockchain platform for distributed apps, enterprise use cases and the new internet economy.',
  name: 'Elrond Community Delegation 🎖',
  score: 111480,
  validators: 929,
  stake: '2322500000000000000000000',
  topUp: '712499999999999983222319',
  stakePercent: 27.69,
  apr: 16.13,
  rank: 1,
};

const t = {
  locked: '632311163991957794111736',
  distribution: {
    erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqq8hlllls7a6h85: 1,
  },
  identity: 'justminingfr',
  avatar: 'https://s3.amazonaws.com/keybase_processed_uploads/a3c1904616e3b1d6177a0b3770af3405_360_360.jpg',
  description: 'French Crypto Investment platform\nwww.just-mining.com',
  name: 'Just Mining',
  website: 'http://just-mining.com',
  location: 'France',
  score: 26699,
  validators: 224,
  stake: '557500000000000000000000',
  topUp: '74811163991957794111736',
  providers: [
    'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqq8hlllls7a6h85',
  ],
  stakePercent: 5.76,
  apr: 16.76,
  rank: 2,
};

export const fakeData = [];

for (let i = 0; i < 10; i += 1) {
  fakeData.push(d);
  fakeData.push(t);
}

export const fakeProvider = [{
  provider: 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqq8hlllls7a6h85',
  serviceFee: 0.165,
  delegationCap: '660999810000000000000000',
  apr: 13.79,
  numUsers: 9328,
  cumulatedRewards: '55249886006775104532096',
  identity: 'justminingfr',
  numNodes: 224,
  stake: '557500000000000000000000',
  topUp: '77387046349874707313513',
  locked: '634887046349874707313513',
  featured: true,
}];

export const fake = Array(20).fill(fakeProvider);
