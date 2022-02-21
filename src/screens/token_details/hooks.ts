import {
  useState, useEffect,
} from 'react';
import axios from 'axios';
import * as R from 'ramda';
import { useRouter } from 'next/router';
import { chainConfig } from '@configs';
import { formatToken } from '@utils/format_token';
import { TOKEN_DETAILS } from '@api';
import { TokenDetailsState } from './types';
import { fakeTwo as fake } from './fakedata';

const defaultTokenUnit: TokenUnit = {
  value: '0',
  baseDenom: '',
  displayDenom: '',
  exponent: 0,
};

export const useTokenDetails = () => {
  const router = useRouter();
  const [state, setState] = useState<TokenDetailsState>({
    loading: true,
    exists: true,
    profile: {
      name: '',
      identifier: '',
      description: '',
      imageUrl: '',
    },
    overview: {
      owner: '',
      decimals: 0,
      website: '',
      email: '',
    },
  });

  useEffect(() => {
    getTokenDetail();
  }, [router.query.token]);

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  const getTokenDetail = async () => {
    try {
      // const { data: tokenData } = await axios.get(
      //   TOKEN_DETAILS(router.query.token as string),
      // );
      const tokenData = fake;

      // profile
      const profile = {
        name: R.pathOr('', ['name'], tokenData),
        identifier: R.pathOr('', ['identifier'], tokenData),
        description: R.pathOr('', ['assets', 'description'], tokenData),
        imageUrl: R.pathOr('', ['assets', 'pngUrl'], tokenData),
      };

      // overview
      const overview = {
        owner: R.pathOr('', ['owner'], tokenData),
        decimals: R.pathOr(0, ['decimals'], tokenData),
        website: R.pathOr('', ['assets', 'website'], tokenData),
        email: R.pathOr('', ['assets', 'social', 'email'], tokenData),
      };

      // // action
      // let action = null;
      // if (transactionData.action) {
      //   action = {
      //     category: R.pathOr('', ['category'], transactionData.action),
      //     name: R.pathOr('', ['name'], transactionData.action),
      //     description: R.pathOr('', ['description'], transactionData.action),
      //   };
      // }

      // // operations
      // const operations = R.pathOr([], ['operations'], transactionData).map((x) => {
      //   return ({
      //     action: R.pathOr('', ['action'], x),
      //     sender: R.pathOr('', ['sender'], x),
      //     receiver: R.pathOr('', ['receiver'], x),
      //     identifier: R.pathOr('', ['identifier'], x),
      //   });
      // });

      // // results
      // const results = R.pathOr([], ['results'], transactionData).map((x) => {
      //   return ({
      //     hash: R.pathOr('', ['hash'], x),
      //     sender: R.pathOr('', ['sender'], x),
      //     receiver: R.pathOr('', ['receiver'], x),
      //     data: R.pathOr('', ['data'], x),
      //     value: formatToken(R.pathOr(0, ['value'], x), chainConfig.primaryTokenUnit),
      //   });
      // });

      handleSetState({
        loading: false,
        profile,
        overview,
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
