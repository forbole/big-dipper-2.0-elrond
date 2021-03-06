import {
  useEffect, useState,
} from 'react';
import * as R from 'ramda';
import { useRouter } from 'next/router';
import axios from 'axios';
import { isBech32 } from '@utils/bech32';
import {
  POLLING_INTERVAL,
  NODES_COUNT,
  NODES,
} from '@api';
import { useInterval } from '@hooks';
import { NodeState } from './types';

export const PAGE_SIZE = 10;

export const useBlocks = () => {
  const router = useRouter();
  const [state, setState] = useState<NodeState>({
    page: 0,
    loading: true,
    items: [],
    total: 0,
  });

  useEffect(() => {
    getNodesTotal();
  }, [router.query.identity]);

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  const handlePageChangeCallback = async (page: number, _rowsPerPage: number) => {
    handleSetState({
      page,
      loading: true,
    });
    await getBlocksByPage(page);
  };

  const getNodesTotal = async () => {
    try {
      const params:any = {
        // come back to this later
        // brave will block the api if type validator is present
        // type: 'validator',
      };
      if (isBech32(router.query.identity as string)) {
        params.provider = router.query.identity;
      } else {
        params.identity = router.query.identity;
      }

      const { data: total } = await axios.get(NODES_COUNT, {
        params,
      });
      handleSetState({
        total,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBlocksByPage = async (page: number) => {
    try {
      const params:any = {
        from: page * PAGE_SIZE,
        size: PAGE_SIZE,
        type: 'validator',
      };
      if (isBech32(router.query.identity as string)) {
        params.provider = router.query.identity;
      } else {
        params.identity = router.query.identity;
      }
      const { data: blocksData } = await axios.get(NODES, {
        params,
      });

      const items = blocksData.map((x) => {
        return ({
          pubkey: R.pathOr('', ['bls'], x),
          name: R.pathOr('', ['name'], x),
          shard: R.pathOr(0, ['shard'], x),
          version: R.pathOr('', ['version'], x),
          status: R.pathOr('', ['status'], x),
          online: R.pathOr(false, ['online'], x),
        });
      });

      handleSetState({
        loading: false,
        items,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBlocksInterval = async () => {
    if (state.page === 0) {
      await getBlocksByPage(0);
    }
  };

  useInterval(getBlocksInterval, POLLING_INTERVAL);

  return ({
    state,
    handlePageChangeCallback,
  });
};
