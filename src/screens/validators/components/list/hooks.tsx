import {
  useEffect, useState,
} from 'react';
import * as R from 'ramda';
import axios from 'axios';
import {
  IDENTITIES, PROVIDERS,
} from '@api';
import { formatToken } from '@utils/format_token';
import { chainConfig } from '@configs';
import {
  ValidatorsState,
  // ItemType,
} from './types';
import { fakeProvider } from './fakes';

export const useValidators = () => {
  const [state, setState] = useState<ValidatorsState>({
    loading: true,
    exists: true,
    tab: 0,
    search: '',
    validators: [],
    providers: [],
  });

  useEffect(() => {
    getValidators();
  }, []);

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  const handleTabChange = (_event: any, newValue: number) => {
    setState((prevState) => ({
      ...prevState,
      tab: newValue,
    }));
  };

  const handleSearch = (value: string) => {
    handleSetState({
      search: value,
    });
  };

  const getValidators = async () => {
    try {
      const { data: validatorsData } = await axios.get(IDENTITIES);
      // const { data: providersData } = await axios.get(PROVIDERS);
      const providersData = fakeProvider;

      // identities
      const identities = {};
      validatorsData.forEach((x) => {
        const identity = R.pathOr('', ['identity'], x);
        const imageUrl = R.pathOr('', ['avatar'], x);
        const name = R.pathOr('', ['name'], x);

        const validator: AvatarName = {
          address: identity,
          imageUrl,
          name,
        };

        if (identity) {
          identities[identity] = validator;
        }
      });

      // validators
      const validators = validatorsData.map((x) => {
        const identity = R.pathOr('', ['identity'], x);
        const imageUrl = R.pathOr('', ['avatar'], x);
        const name = R.pathOr('', ['name'], x);

        const validator: AvatarName = {
          address: identity,
          imageUrl,
          name,
        };

        return ({
          validator,
          stake: formatToken(
            R.pathOr('0', ['stake'], x),
            chainConfig.primaryTokenUnit,
          ),
          stakePercent: R.pathOr(0, ['stakePercent'], x),
          nodes: R.pathOr(0, ['validators'], x),
        });
      });

      // providers
      const providers = providersData.map((x) => {
        const identity = R.pathOr(null, ['identity'], x);
        const validator = R.pathOr({
          address: R.pathOr('', ['provider'], x),
          imageUrl: '',
          name: '',
        }, [identity], identities);

        return ({
          validator,
          stake: formatToken(
            R.pathOr('0', ['stake'], x),
            chainConfig.primaryTokenUnit,
          ),
          nodes: R.pathOr(0, ['numNodes'], x),
          serviceFee: R.pathOr(0, ['serviceFee'], x),
          apr: R.pathOr(0, ['apr'], x),
        });
      });

      handleSetState({
        loading: false,
        validators,
        providers,
      });
    } catch (error) {
      handleSetState({
        loading: false,
        exists: false,
      });
      console.log(error.message);
    }
  };

  return ({
    state,
    handleTabChange,
    handleSearch,
  });
};
