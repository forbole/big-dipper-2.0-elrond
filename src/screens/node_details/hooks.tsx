import {
  useState,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';
import * as R from 'ramda';
import { NodeDetailsState } from './types';
import {
  fakeData, fakeIdentity,
} from './fakedata';

export const useNodeDetails = () => {
  const router = useRouter();
  const [state, setState] = useState<NodeDetailsState>({
    // loading: true,
    loading: false,
    exists: true,
    profile: {
      name: '',
      version: '',
      pubkey: '',
      validator: '',
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

      let validator = '';

      if (nodeData.identity) {
        const identity = await getIdentity();
        validator = identity || nodeData.provider;
      }

      handleSetState({
        loading: false,
        profile: {
          name: nodeData.name,
          version: nodeData.version,
          pubkey: nodeData.bls,
          validator,
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

  const getIdentity = async () => {
    try {
      // const { data: nodeData } = await axios.get(MINIBLOCK_DETAILS(router.query.hash as string));
      const identityData = fakeIdentity;
      return identityData.name;
    } catch (error) {
      return null;
    }
  };

  return ({
    state,
  });
};