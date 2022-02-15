import {
  useState, useEffect,
} from 'react';
import { useRouter } from 'next/router';
import * as R from 'ramda';
import axios from 'axios';
import { ACCOUNT_DETAILS } from '@api';
import { AccountDetailsType } from './types';
import { two } from './fakeData';

export const useAccountDetails = () => {
  const router = useRouter();
  const [state, setState] = useState<AccountDetailsType>({
    loading: true,
    exists: true,
    profile: {
      address: '',
      username: '',
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

    const accountData = two;

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

    handleSetState(newState);
  };

  return {
    state,
  };
};
