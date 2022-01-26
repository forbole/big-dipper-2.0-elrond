import {
  useState, useEffect,
} from 'react';
import axios from 'axios';
import * as R from 'ramda';
import { useRouter } from 'next/router';
import { TRANSACTION_DETAILS } from '@api';
import { TransactionDetailsState } from './types';
import { fakeData } from './fake';

export const useTransactionDetails = () => {
  const router = useRouter();
  const [state, setState] = useState<TransactionDetailsState>({
    loading: true,
    exists: true,
    overview: {
      hash: '',
      fromShard: 0,
      toShard: 0,
      from: '',
      to: '',
      timestamp: 0,
      status: '',
      miniblockHash: '',
    },
    data: '',
  });

  useEffect(() => {
    getTransactionDetail();
    // getTransactions();
  }, [router.query.hash]);

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  const getTransactionDetail = async () => {
    try {
      // eslint-disable-next-line
      // const { data: transactionData } = await axios.get(TRANSACTION_DETAILS(router.query.hash as string));
      const transactionData = fakeData;

      // overview
      const overview = {
        hash: transactionData.txHash,
        fromShard: transactionData.senderShard,
        toShard: transactionData.receiverShard,
        from: transactionData.sender,
        to: transactionData.receiver,
        timestamp: transactionData.timestamp,
        status: transactionData.status,
        miniblockHash: transactionData.miniBlockHash,
      };

      // action
      let action = null;
      if (transactionData.action) {
        action = {
          category: R.pathOr('', ['category'], transactionData.action),
          name: R.pathOr('', ['name'], transactionData.action),
          description: R.pathOr('', ['description'], transactionData.action),
        };
      }

      handleSetState({
        loading: false,
        overview,
        data: R.pathOr('', ['data'], transactionData),
        action,
      });
    } catch (error) {
      handleSetState({
        loading: false,
        exists: false,
      });
      console.log(error.message);
    }
  };

  // const getTransactions = async () => {
  //   try {
  //     const { data: transactionsData } = await axios.get(TRANSACTIONS, {
  //       params: {
  //         miniBlockHash: router.query.hash,
  //       },
  //     });

  //     const transactions = transactionsData.map((x) => {
  //       return ({
  //         hash: x.txHash,
  //         fromShard: x.senderShard,
  //         toShard: x.receiverShard,
  //         from: x.sender,
  //         to: x.receiver,
  //         timestamp: x.timestamp,
  //         status: x.status,
  //       });
  //     });

  //     handleSetState({
  //       transactions,
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return {
    state,
  };
};
