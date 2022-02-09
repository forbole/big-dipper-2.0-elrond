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

      if (R.pathOr('', ['identity'], nodeData)) {
        const identity = await getIdentity();
        const nodeDataProvider = R.pathOr('', ['provider'], nodeData);
        validator = identity || nodeDataProvider;
      }

      const newState: any = {
        loading: false,
      };

      newState.profile = {
        name: R.pathOr('', ['name'], nodeData),
        version: R.pathOr('', ['version'], nodeData),
        pubkey: R.pathOr('', ['bls'], nodeData),
        rating: R.pathOr(0, ['rating'], nodeData),
        validator,
      };

      newState.overview = {
        shard: R.pathOr(0, ['shard'], nodeData),
        type: R.pathOr('', ['type'], nodeData),
        status: R.pathOr('', ['status'], nodeData),
        online: R.pathOr(false, ['online'], nodeData),
        instances: R.pathOr(0, ['instances'], nodeData),
      };

      if (R.pathOr('', ['type'], nodeData).toLowerCase() === 'validator') {
        newState.stats = {
          ignoredSignatures: R.pathOr(0, ['validatorIgnoredSignatures'], nodeData),
          leaderSuccess: R.pathOr(0, ['leaderSuccess'], nodeData),
          leaderFailure: R.pathOr(0, ['leaderFailure'], nodeData),
          validatorSuccess: R.pathOr(0, ['validatorSuccess'], nodeData),
          validatorFailure: R.pathOr(0, ['validatorFailure'], nodeData),
        };
      }

      handleSetState(newState);
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
