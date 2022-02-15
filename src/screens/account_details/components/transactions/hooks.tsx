import {
  useEffect, useState,
} from 'react';
import { useRouter } from 'next/router';
import * as R from 'ramda';
import axios from 'axios';
import {
  POLLING_INTERVAL,
  ACCOUNT_DETAILS_TRANSACTIONS,
  ACCOUNT_DETAILS_TRANSACTIONS_COUNT,
} from '@api';
import { useInterval } from '@hooks';
import { TransactionState } from './types';

export const PAGE_SIZE = 25;

export const useTransactions = () => {
  const router = useRouter();
  const [state, setState] = useState<TransactionState>({
    page: 0,
    loading: true,
    items: [],
    total: 0,
  });

  useEffect(() => {
    getLatestTransactionCount();
  }, [router.query.address]);

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  const handlePageChangeCallback = async (page: number, _rowsPerPage: number) => {
    handleSetState({
      page,
      loading: true,
    });
    await getTransactionsByPage(page);
  };

  const getLatestTransactionCount = async () => {
    try {
      const { data: total } = await axios.get(ACCOUNT_DETAILS_TRANSACTIONS_COUNT(
        router.query.address as string,
      ));
      handleSetState({
        total,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTransactionsByPage = async (page: number) => {
    try {
      const { data: transactionsData } = await axios.get(
        ACCOUNT_DETAILS_TRANSACTIONS(router.query.address as string), {
          params: {
            from: page * PAGE_SIZE,
            size: PAGE_SIZE,
            withLogs: false,
          },
        },
      );

      const items = transactionsData.map((x) => {
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
        loading: false,
        items,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTransactionsInterval = async () => {
    if (state.page === 0) {
      await getTransactionsByPage(0);
    }
  };

  useInterval(getTransactionsInterval, POLLING_INTERVAL);

  return ({
    state,
    handlePageChangeCallback,
  });
};
