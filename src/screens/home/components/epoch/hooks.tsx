import { useState } from 'react';
import { EpochState } from './types';

export const useEpoch = () => {
  const [state, setState] = useState<EpochState>({
    epoch: 0,
    roundsPassed: 0,
    roundsPerEpoch: 0,
  });

  return {
    state,
  };
};
