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
import { ValidatorsState } from './types';
import { fakeData } from './fakes';

export const useValidators = () => {
  const [state, setState] = useState<ValidatorsState>({
    loading: true,
    exists: true,
    tab: 0,
    items: [],
    sortKey: 'validator.name',
    sortDirection: 'asc',
  });

  useEffect(() => {
    getValidators();
  }, []);

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  const getValidators = async () => {
    try {
      // const { data: validatorsData } = await axios.get(IDENTITIES);
      const validatorsData = fakeData;

      const items = validatorsData.map((x) => {
        return ({
          identity: R.pathOr('', ['identity'], x),
          name: R.pathOr('', ['name'], x),
          imageUrl: R.pathOr('', ['avatar'], x),
          stake: formatToken(
            R.pathOr('0', ['stake'], x),
            chainConfig.primaryTokenUnit,
          ),
          stakePercent: R.pathOr(0, ['stakePercent'], x),
          nodes: R.pathOr(0, ['validators'], x),
          provider: !!R.pathOr([], ['providers'], x).length,
        });
      });

      handleSetState({
        loading: false,
        items,
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
  });
};
