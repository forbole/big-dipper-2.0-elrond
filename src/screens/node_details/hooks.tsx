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
      rating: 0,
    },
    overview: {
      shard: 0,
      type: '',
      status: '',
      online: false,
      instances: 0,
    },
    stats: {
      ignoredSignatures: 0,
      leaderSuccess: 0,
      leaderFailure: 0,
      validatorSuccess: 0,
      validatorFailure: 0,
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
          rating: R.pathOr(0, ['rating'], nodeData),
          validator,
        },
        overview: {
          shard: R.pathOr(0, ['shard'], nodeData),
          type: R.pathOr('', ['type'], nodeData),
          status: R.pathOr('', ['status'], nodeData),
          online: R.pathOr(false, ['online'], nodeData),
          instances: R.pathOr(0, ['instances'], nodeData),
        },
        stats: {
          ignoredSignatures: R.pathOr(0, ['validatorIgnoredSignatures'], nodeData),
          leaderSuccess: R.pathOr(0, ['leaderSuccess'], nodeData),
          leaderFailure: R.pathOr(0, ['leaderFailure'], nodeData),
          validatorSuccess: R.pathOr(0, ['validatorSuccess'], nodeData),
          validatorFailure: R.pathOr(0, ['validatorFailure'], nodeData),
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
