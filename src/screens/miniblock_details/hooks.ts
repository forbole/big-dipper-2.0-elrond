import {
  useState, useEffect,
} from 'react';
import axios from 'axios';
import * as R from 'ramda';
import { useRouter } from 'next/router';
import { BLOCK_DETAILS } from '@api';
import { BlockDetailsState } from './types';

const fakeData = {
  miniBlockHash: 'b9b689d2c28f051214255daeecd2190b31d24748e34d79a0ff9ddb5c167f8bcb',
  receiverBlockHash: 'ab412eafe39afd193469222716fc07a75bc264a3a0b4a88be25e4142133a17c7',
  receiverShard: 1,
  senderBlockHash: '5f03340dcd972fdbbf8454efdb4d17852f0e8d2461cb9c23b25ca27f4ac09f20',
  senderShard: 2,
  timestamp: 1643163078,
  type: 'TxBlock',
};

export const useBlockDetails = () => {
  const router = useRouter();
  const [state, setState] = useState<BlockDetailsState>({
    loading: true,
    exists: true,
    overview: {
      block: 0,
      hash: '',
      proposer: '',
      timestamp: 0,
      txs: 0,
      gasPenalized: 0,
      gasProvided: 0,
      gasRefunded: 0,
      gasUsed: 0,
      size: 0,
      shard: 0,
    },
    miniBlocks: [],
    consensus: [],
  });

  useEffect(() => {
    getBlockDetails();
  }, [router.query.hash]);

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  const getBlockDetails = async () => {
    try {
      const { data: blockData } = await axios.get(BLOCK_DETAILS(router.query.hash as string));

      handleSetState({
        loading: false,
        overview: {
          block: blockData.round,
          hash: blockData.hash,
          proposer: blockData.proposer,
          timestamp: blockData.timestamp,
          txs: blockData.txCount,
          size: blockData.sizeTxs,
          shard: blockData.shard,
          gasUsed: blockData.gasConsumed,
          gasProvided: blockData.maxGasLimit,
          gasRefunded: blockData.gasRefunded,
          gasPenalized: blockData.gasPenalized,
        },
        miniBlocks: R.pathOr([], ['miniBlocksHashes'], blockData),
        consensus: blockData.validators,
      });
    } catch (error) {
      handleSetState({
        loading: false,
        exists: false,
      });
      console.log(error.message);
    }
  };

  return {
    state,
  };
};
