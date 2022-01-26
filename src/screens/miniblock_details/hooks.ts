import {
  useState, useEffect,
} from 'react';
import axios from 'axios';
import * as R from 'ramda';
import { useRouter } from 'next/router';
import {
  MINIBLOCK_DETAILS, TRANSACTIONS,
} from '@api';
import { BlockDetailsState } from './types';

export const useBlockDetails = () => {
  const router = useRouter();
  const [state, setState] = useState<BlockDetailsState>({
    loading: true,
    exists: true,
    overview: {
      hash: '',
      receiverBlockHash: '',
      senderBlockHash: '',
      receiverShard: 0,
      senderShard: 0,
      timestamp: 0,
      type: '',
    },
    transactions: [],
  });

  useEffect(() => {
    getBlockDetails();
    getTransactions();
  }, [router.query.hash]);

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  const getBlockDetails = async () => {
    try {
      const { data: blockData } = await axios.get(MINIBLOCK_DETAILS(router.query.hash as string));

      handleSetState({
        loading: false,
        overview: {
          hash: blockData.miniBlockHash,
          receiverBlockHash: blockData.receiverBlockHash,
          senderBlockHash: blockData.senderBlockHash,
          receiverShard: blockData.receiverShard,
          senderShard: blockData.senderShard,
          timestamp: blockData.timestamp,
          type: blockData.type,
        },
      });
    } catch (error) {
      handleSetState({
        loading: false,
        exists: false,
      });
      console.log(error.message);
    }
  };

  const getTransactions = async () => {
    try {
      const { data: transactionsData } = await axios.get(TRANSACTIONS, {
        params: {
          miniBlockHash: router.query.hash,
        },
      });

      const transactions = transactionsData.map((x) => {
        return ({
          hash: x.txHash,
          fromShard: x.senderShard,
          toShard: x.receiverShard,
          from: x.sender,
          to: x.receiver,
          timestamp: x.timestamp,
          status: x.status,
        });
      });

      handleSetState({
        transactions,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return {
    state,
  };
};
