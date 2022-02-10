import { useState } from 'react';
import * as R from 'ramda';
import { ValidatorDetailsState } from './types';

export const useValidatorDetails = () => {
  const [state, setState] = useState<ValidatorDetailsState>({
    // loading: true,
    loading: false,
    exists: true,
  });

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  return {
    state,
  };
};
