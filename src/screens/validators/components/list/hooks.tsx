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
  ValidatorsState, ValidatorType,
} from './types';
import { fakeData } from './fakes';

export const useValidators = () => {
  const [search, setSearch] = useState('');
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

  const handleTabChange = (_event: any, newValue: number) => {
    setState((prevState) => ({
      ...prevState,
      tab: newValue,
    }));
  };

  const handleSort = (key: string) => {
    if (key === state.sortKey) {
      setState((prevState) => ({
        ...prevState,
        sortDirection: prevState.sortDirection === 'asc' ? 'desc' : 'asc',
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        sortKey: key,
        sortDirection: 'asc', // new key so we start the sort by asc
      }));
    }
  };

  const sortItems = (items: ValidatorType[]) => {
    let sorted: ValidatorType[] = R.clone(items);

    if (state.tab === 0) {
      // sorted = sorted.filter((x) => x.status === 3);
    }

    if (state.tab === 1) {
      // sorted = sorted.filter((x) => x.status !== 3);
    }

    if (search) {
      sorted = sorted.filter((x) => {
        const formattedSearch = search.toLowerCase().replace(/ /g, '');
        return (
          x.name.toLowerCase().replace(/ /g, '').includes(formattedSearch)
          || x.identity.toLowerCase().includes(formattedSearch)
        );
      });
    }

    if (state.sortKey && state.sortDirection) {
      sorted.sort((a, b) => {
        let compareA = R.pathOr(undefined, [...state.sortKey.split('.')], a);
        let compareB = R.pathOr(undefined, [...state.sortKey.split('.')], b);

        if (typeof compareA === 'string') {
          compareA = compareA.toLowerCase();
          compareB = compareB.toLowerCase();
        }

        if (compareA < compareB) {
          return state.sortDirection === 'asc' ? -1 : 1;
        }
        if (compareA > compareB) {
          return state.sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return sorted;
  };

  const handleSearch = (value: string) => {
    setSearch(value);
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
    handleTabChange,
    handleSort,
    handleSearch,
    sortItems,
  });
};
