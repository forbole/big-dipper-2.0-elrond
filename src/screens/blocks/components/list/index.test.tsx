import React from 'react';
import renderer from 'react-test-renderer';
import { RecoilRoot } from 'recoil';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  LATEST_BLOCK_HEIGHT,
  BLOCKS,
} from '@api';
import {
  MockTheme, wait,
} from '@tests/utils';
import List from '.';

// ==================================
// unit tests
// ==================================

jest.mock('@components', () => ({
  Pagination: (props) => <div id="Pagination" {...props} />,
  NoData: (props) => <div id="NoData" {...props} />,
  Box: (props) => <div id="Box" {...props} />,
  Loading: (props) => <div id="Loading" {...props} />,
  BlocksList: (props) => <div id="BlocksList" {...props} />,
}));

// ==================================
// unit tests
// ==================================
describe('screen: Blocks/List', () => {
  it('matches snapshot', async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(LATEST_BLOCK_HEIGHT).reply(200, 5005);

    mockAxios.onGet(BLOCKS).reply(200, [
      {
        hash: '24b6a32c87896b6b529db9faf74dfed9d0972b62c632e60c08f014ebbbcb892b',
        epoch: 535,
        nonce: 7712359,
        prevHash: '08f4ecd7e013220f14df59391cbf62ff9d96970770fac9ff43cfb17f24260c99',
        proposer: 50,
        pubKeyBitmap: 'ffffffffffffff7f',
        round: 7713524,
        shard: 0,
        size: 832,
        sizeTxs: 3080,
        stateRootHash: '0e56c7177188b089a0b5eaa15ec32b88a030685aa705aa48b2618160de30e389',
        timestamp: 1642398744,
        txCount: 10,
        gasConsumed: 0,
        gasRefunded: 0,
        gasPenalized: 0,
        maxGasLimit: 1500000000,
      },
    ]);

    let component;
    renderer.act(() => {
      component = renderer.create(
        <RecoilRoot>
          <MockTheme>
            <List />
          </MockTheme>
        </RecoilRoot>,
      );
    });
    await wait(3000);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
