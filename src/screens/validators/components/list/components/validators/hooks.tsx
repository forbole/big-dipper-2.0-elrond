import { useState } from 'react';
import * as R from 'ramda';
import Big from 'big.js';
import { ValidatorsState } from './types';
import { ValidatorType } from '../../types';

// .sort((a, b) => (Big(a.amount.value).lt(b.amount.value) ? 1 : -1));

export const useValidators = (search: string) => {
  const [state, setState] = useState<ValidatorsState>({
    sortKey: 'stake.value',
    sortDirection: 'desc',
  });

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

    if (search) {
      sorted = sorted.filter((x) => {
        const formattedSearch = search.toLowerCase().replace(/ /g, '');
        return (
          x.validator.name.toLowerCase().replace(/ /g, '').includes(formattedSearch)
          || x.validator.address.toLowerCase().includes(formattedSearch)
        );
      });
    }

    if (state.sortKey && state.sortDirection) {
      sorted.sort((a, b) => {
        let compareA = R.pathOr(undefined, [...state.sortKey.split('.')], a);
        let compareB = R.pathOr(undefined, [...state.sortKey.split('.')], b);

        const specialCases = ['stake.value', 'topUp.value'];

        if (specialCases.includes(state.sortKey)) {
          compareA = Number(compareA);
          compareB = Number(compareB);
          if (Big(compareA).lt(compareB)) {
            return state.sortDirection === 'asc' ? -1 : 1;
          }
          if (Big(compareA).gt(compareB)) {
            return state.sortDirection === 'asc' ? 1 : -1;
          }
        } else if (typeof compareA === 'string') {
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

  return ({
    state,
    handleSort,
    sortItems,
  });
};
