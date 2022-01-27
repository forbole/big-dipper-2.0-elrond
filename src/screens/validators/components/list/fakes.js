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

for (let i = 0; i < 10; i += 1) {
  fakeData.push(d);
  fakeData.push(t);
}

export const fakeData = [...Array(10).fill(d), ...Array(10).fill(t)];
