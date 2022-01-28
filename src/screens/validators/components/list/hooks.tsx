import {
  useEffect, useState,
} from 'react';
import * as R from 'ramda';
import axios from 'axios';
import {
  IDENTITIES,
} from '@api';
import { formatToken } from '@utils/format_token';
import { chainConfig } from '@configs';
import {
  ValidatorsState,
  // ItemType,
} from './types';

export const useValidators = () => {
  const [state, setState] = useState<ValidatorsState>({
    loading: true,
    exists: true,
    tab: 0,
    search: '',
    validators: [],
    identities: {},
    // sortKey: 'validator.name',
    // sortDirection: 'desc',
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
      const identities = {};
      const validators = validatorsData.map((x) => {
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
