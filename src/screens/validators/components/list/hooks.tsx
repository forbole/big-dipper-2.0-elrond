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
} from './types';

export const useValidators = () => {
  const [state, setState] = useState<ValidatorsState>({
    loading: true,
    exists: true,
    tab: 0,
    search: '',
    validators: [],
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
      const { data: providersData } = await axios.get(PROVIDERS);

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

      // get the unique keys first
      const allValidators: any = {};
      const allValidatorData: any = {};
      const allProviderData: any = {};

      validatorsData.forEach((x) => {
        const identity = R.pathOr(null, ['identity'], x);
        const validator = R.pathOr({
          address: R.pathOr('', ['name'], x),
          imageUrl: '',
          name: R.pathOr('', ['name'], x),
        }, [identity], identities);
        if (!allValidators[validator.address]) {
          allValidators[validator.address] = validator;
        }
        allValidatorData[validator.address] = x;
      });

      providersData.forEach((x) => {
        const identity = R.pathOr(null, ['identity'], x);
        const validator = R.pathOr({
          address: R.pathOr('', ['provider'], x),
          imageUrl: '',
          name: R.pathOr('', ['provider'], x),
        }, [identity], identities);

        // validator should be unique
        if (!allValidators[validator.address]) {
          allValidators[validator.address] = validator;
        }
        // should i care about this?
        allProviderData[validator.address] = x;
      });

      const validators = R.keys(allValidators).map((x) => {
        const validator = allValidators[x];
        const validatorData = allValidatorData[x] || {};
        const providerData = allProviderData[x] || {};
        const data = R.mergeAll([providerData, validatorData]);
        return ({
          validator,
          stake: formatToken(
            R.pathOr('0', ['stake'], data),
            chainConfig.primaryTokenUnit,
          ),
          nodes: R.pathOr(0, ['validators'], data),
          commission: R.pathOr(undefined, ['serviceFee'], data),
          apr: R.pathOr(undefined, ['apr'], data),
          delegators: R.pathOr(undefined, ['numUsers'], data),
        });
      });

      handleSetState({
        loading: false,
        validators,
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
