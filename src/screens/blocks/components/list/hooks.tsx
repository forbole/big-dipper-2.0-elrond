import { useState } from 'react';
import { BlockState } from './types';

// const FakeData = {
//   hash: '80ea1767e33d755b50dc997eb6cfecbb47e2945c598240cb1e0f3a378e0942b9',
//   epoch: 531,
//   nonce: 7656377,
//   prevHash: 'd4b486bd29e91112d774b0409cccb87ef027f6dd0532ae4eccd9e327ca14aa33',
//   proposer: 148,
//   pubKeyBitmap: 'ffffffffffffff7f',
//   round: 7657541,
//   shard: 0,
//   size: 892,
//   sizeTxs: 3741,
//   stateRootHash: 'aad90e2a46cb65524c66e0ae4648e4b84999e74c025095db6334e35270c10827',
//   timestamp: 1642062846,
//   txCount: 9,
//   gasConsumed: 73050000,
//   gasRefunded: 0,
//   gasPenalized: 0,
//   maxGasLimit: 1500000000,
// };

const fakeItem = {
  block: 7657541,
  timestamp: 1642062846,
  txs: 9,
  shard: 0,
  size: 892,
  hash: '80ea1767e33d755b50dc997eb6cfecbb47e2945c598240cb1e0f3a378e0942b9',
};

export const useBlocks = () => {
  const [state, _setState] = useState<BlockState>({
    page: 1,
    // itemLoading: true,
    loading: false,
    // items: [],
    items: Array(25).fill(fakeItem),
    total: 1000,
  });

  const handlePageChange = (_page: number, _rowsPerPage: number) => {
    console.log('new page');
  };

  return ({
    state,
    handlePageChange,
  });
};
