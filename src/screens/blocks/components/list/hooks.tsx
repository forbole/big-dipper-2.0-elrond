import { useState } from 'react';
import * as R from 'ramda';
import axios from 'axios';
import {
  POLLING_INTERVAL, BLOCKS,
} from '@api';
import { useInterval } from '@hooks';
import { BlockState } from './types';

const PAGE_SIZE = 25;

export const useBlocks = () => {
  const [state, setState] = useState<BlockState>({
    page: 0,
    loading: true,
    items: [],
    total: 1000,
  });

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  const handlePageChangeCallback = async (page: number, _rowsPerPage: number) => {
    console.log(page, 'wtf');
    // console.log(page, 'page');
    // handleSetState({
    //   page,
    // });
    // await getBlocksByPage(page);
  };

  const getBlocksByPage = async (page: number) => {
    try {
      // console.log(page, 'page!');
      handleSetState({
        loading: true,
      });
      const { data: blocksData } = await axios.get(BLOCKS, {
        params: {
          from: page * PAGE_SIZE,
          size: PAGE_SIZE,
        },
      });

      const items = blocksData.map((x) => {
        return ({
          block: x.round,
          timestamp: x.timestamp,
          hash: x.hash,
          txs: x.txCount,
          shard: x.shard,
          size: x.sizeTxs,
        });
      });

      handleSetState({
        loading: false,
        items,
      });
      console.log(blocksData, 'wtf');
    } catch (error) {
      console.log(error.message);
    }
  };

  // handles interval calls for first page
  // const getBlocksInterval = async () => {
  //   if (state.page === 1) {
  //     await getBlocksByPage(0);
  //   }
  // };

  // useInterval(getBlocksInterval, POLLING_INTERVAL);

  return ({
    state,
    handlePageChangeCallback,
  });
};
