import {
  useState,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';
import * as R from 'ramda';
import { NodeDetailsState } from './types';
import { fakeData } from './fakedata';

export const useNodeDetails = () => {
  const router = useRouter();
  const [state, setState] = useState<NodeDetailsState>({
    // loading: true,
    loading: false,
    exists: true,
    profile: {
      name: '',
      version: '',
    },
  });

  useEffect(() => {
    getNodeDetails();
  }, [router.query.hash]);

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  const getNodeDetails = async () => {
    try {
      // const { data: nodeData } = await axios.get(MINIBLOCK_DETAILS(router.query.hash as string));
      const nodeData = fakeData;

      handleSetState({
        loading: false,
        profile: {
          name: nodeData.name,
          version: nodeData.version,
        },
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
