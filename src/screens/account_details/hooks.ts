import {
  useState, useEffect,
} from 'react';
import { useRouter } from 'next/router';
import * as R from 'ramda';
import { chainConfig } from '@configs';
import axios from 'axios';
import {
  ACCOUNT_DETAILS, ACCOUNT_DETAILS_TOKEN_COUNT,
} from '@api';
import { formatToken } from '@utils/format_token';
import { AccountDetailsType } from './types';
import {
  two, fakeTokenCount,
} from './fakeData';

const defaultTokenUnit: TokenUnit = {
  value: '0',
  baseDenom: '',
  displayDenom: '',
  exponent: 0,
};

export const useAccountDetails = () => {
  const router = useRouter();
  const [state, setState] = useState<AccountDetailsType>({
    loading: true,
    exists: true,
    profile: {
      address: '',
      username: '',
    },
    overview: {
      balance: defaultTokenUnit,
      developerReward: defaultTokenUnit,
      shard: 0,
      tokenCount: 0,
    },
  });

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  useEffect(() => {
    getAccount();
  }, [router.query.address]);

  const getAccount = async () => {
    // const { data: accountData } = await axios.get(ACCOUNT_DETAILS(router.query.address as string));

    // const { data: tokenCountData } = await axios.get(ACCOUNT_DETAILS_TOKEN_COUNT(router.query.address as string));

    const accountData = two;

    const tokenCount = fakeTokenCount;

    const newState: any = {
      loading: false,
    };

    const getProfile = () => {
      return ({
        address: R.pathOr('', ['address'], accountData),
        username: R.pathOr('', ['username'], accountData),
      });
    };

    newState.profile = getProfile();

    const getOverview = () => {
      return ({
        balance: formatToken(
          R.pathOr('0', ['balance'], accountData),
          chainConfig.primaryTokenUnit,
        ),
        developerReward: formatToken(
          R.pathOr('0', ['developerReward'], accountData),
          chainConfig.primaryTokenUnit,
        ),
        shard: R.pathOr(0, ['shard'], accountData),
        tokenCount,
      });
    };

    newState.overview = getOverview();

    handleSetState(newState);
  };

  return {
    state,
  };
};
