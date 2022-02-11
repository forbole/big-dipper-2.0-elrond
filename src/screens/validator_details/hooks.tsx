import {
  useState, useEffect,
} from 'react';
import * as R from 'ramda';
import axios from 'axios';
import { chainConfig } from '@configs';
import { useRouter } from 'next/router';
import {
  IDENTITY,
  PROVIDERS,
  STAKE,
} from '@api';
import { formatToken } from '@utils/format_token';
import { ValidatorDetailsState } from './types';
import {
  fakeIdentity, fakeprovider,
} from './fakedata';

const defaultTokenUnit: TokenUnit = {
  value: '0',
  baseDenom: '',
  displayDenom: '',
  exponent: 0,
};

export const useValidatorDetails = () => {
  const router = useRouter();
  const [state, setState] = useState<ValidatorDetailsState>({
    // loading: true,
    loading: false,
    exists: true,
    isProvider: false,
    contract: null,
    stake: {
      totalStaked: defaultTokenUnit,
      locked: defaultTokenUnit,
      stake: defaultTokenUnit,
      topUp: defaultTokenUnit,
      stakePercent: 0,
    },
  });

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  useEffect(() => {
    getValidator();
  }, [router.query.identity]);

  const getValidator = async () => {
    try {
      // const { data: identityData } = await axios.get(IDENTITY(router.query.identity as string));
      // const { data: providersData } = await axios.get(PROVIDERS, {
      //   params: {
      //     identity: router.query.identity,
      //     size: 1,
      //   },
      // });
      const identityData = fakeIdentity;
      const providerRawData = fakeprovider;
      const providerData = R.pathOr(null, [0], providerRawData);

      const isProvider = !!providerData;

      const newState: any = {
        loading: false,
        isProvider,
      };
      // =====================================
      // contract
      // =====================================
      if (isProvider) {
        const getContract = () => {
          return ({
            address: R.pathOr('', ['provider'], providerData),
            locked: formatToken(
              R.pathOr('0', ['locked'], providerData),
              chainConfig.primaryTokenUnit,
            ),
            nodes: R.pathOr(0, ['numNodes'], providerData),
            apr: R.pathOr(0, ['apr'], providerData),
            commission: R.pathOr(0, ['serviceFee'], providerData),
            delegationCap: formatToken(
              R.pathOr('0', ['delegationCap'], providerData),
              chainConfig.primaryTokenUnit,
            ),
          });
        };

        newState.contract = getContract();
      }

      // =====================================
      // stake
      // =====================================
      const getStake = async () => {
        const { data: stakeData } = await axios.get(STAKE);
        return ({
          locked: formatToken(
            R.pathOr('0', ['locked'], identityData),
            chainConfig.primaryTokenUnit,
          ),
          stake: formatToken(
            R.pathOr('0', ['stake'], identityData),
            chainConfig.primaryTokenUnit,
          ),
          topUp: formatToken(
            R.pathOr('0', ['topUp'], identityData),
            chainConfig.primaryTokenUnit,
          ),
          totalStaked: formatToken(
            R.pathOr('0', ['totalStaked'], stakeData),
            chainConfig.primaryTokenUnit,
          ),
          stakePercent: R.pathOr(0, ['stakePercent'], identityData),
        });
      };
      newState.stake = await getStake();

      handleSetState(newState);
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
