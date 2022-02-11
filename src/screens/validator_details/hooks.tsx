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
import { isBech32 } from '@utils/bech32';
import { formatToken } from '@utils/format_token';
import { ValidatorDetailsState } from './types';

const defaultTokenUnit: TokenUnit = {
  value: '0',
  baseDenom: '',
  displayDenom: '',
  exponent: 0,
};

export const useValidatorDetails = () => {
  const router = useRouter();
  const [state, setState] = useState<ValidatorDetailsState>({
    loading: true,
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
    profile: {
      name: '',
      imageUrl: '',
      description: '',
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
      const { data: identityData } = await axios.get(IDENTITY(router.query.identity as string));
      const params: any = {
        size: 1,
      };

      if (isBech32(router.query.identity as string)) {
        params.provider = router.query.identity;
      } else {
        params.identity = router.query.identity;
      }

      const { data: providerRawData } = await axios.get(PROVIDERS, {
        params: router.query.identity,
      });

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

      // =====================================
      // profile
      // =====================================
      const getProfile = () => {
        return ({
          name: R.pathOr('', ['name'], identityData),
          imageUrl: R.pathOr('', ['avatar'], identityData),
          description: R.pathOr('', ['description'], identityData),
          identity: R.pathOr('', ['identity'], identityData),
        });
      };
      newState.profile = await getProfile();

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
