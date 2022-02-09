import {
  useState,
  useEffect,
} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import * as R from 'ramda';
import {
  ROUNDS,
  STATS,
  NODE_DETAILS,
  IDENTITY,
} from '@api';
import { NodeDetailsState } from './types';

export const useNodeDetails = () => {
  const router = useRouter();
  const [state, setState] = useState<NodeDetailsState>({
    loading: true,
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
    consensus: [],
  });

  useEffect(() => {
    getData();
  }, [router.query.hash]);

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  const getData = async () => {
    await getNodeDetails();
  };

  const getNodeDetails = async () => {
    try {
      const { data: nodeData } = await axios.get(NODE_DETAILS(router.query.hash as string));

      const newState: any = {
        loading: false,
      };

      // =============================================
      // Profile
      // =============================================

      const formatProfile = async () => {
        let validator = '';
        const nodeDataIdentity = R.pathOr('', ['identity'], nodeData);
        if (nodeDataIdentity) {
          const identity = await getIdentity(nodeDataIdentity);
          const nodeDataProvider = R.pathOr('', ['provider'], nodeData);
          validator = identity || nodeDataProvider;
        }
        return ({
          name: R.pathOr('', ['name'], nodeData),
          version: R.pathOr('', ['version'], nodeData),
          pubkey: R.pathOr('', ['bls'], nodeData),
          rating: R.pathOr(0, ['rating'], nodeData),
          validator,
        });
      };

      newState.profile = await formatProfile();

      // =============================================
      // Overview
      // =============================================

      const formatOverview = () => {
        return ({
          shard: R.pathOr(0, ['shard'], nodeData),
          type: R.pathOr('', ['type'], nodeData),
          status: R.pathOr('', ['status'], nodeData),
          online: R.pathOr(false, ['online'], nodeData),
          instances: R.pathOr(0, ['instances'], nodeData),
        });
      };

      newState.overview = formatOverview();

      // =============================================
      // Stats
      // =============================================

      if (R.pathOr('', ['type'], nodeData).toLowerCase() === 'validator') {
        const formatStats = () => {
          return ({
            ignoredSignatures: R.pathOr(0, ['validatorIgnoredSignatures'], nodeData),
            leaderSuccess: R.pathOr(0, ['leaderSuccess'], nodeData),
            leaderFailure: R.pathOr(0, ['leaderFailure'], nodeData),
            validatorSuccess: R.pathOr(0, ['validatorSuccess'], nodeData),
            validatorFailure: R.pathOr(0, ['validatorFailure'], nodeData),
          });
        };
        newState.stats = formatStats();
      }

      // =============================================
      // Consensus
      // =============================================

      if (R.pathOr('', ['type'], nodeData).toLowerCase() === 'validator') {
        const formatConsensus = async () => {
          const validator = R.pathOr('', ['bls'], nodeData);
          const shard = R.pathOr('', ['shard'], nodeData);
          const epoch = await getEpoch();
          const consensusData = await getConsensus({
            validator,
            shard,
            epoch,
          });
          return consensusData.map((x) => ({
            round: x.round,
            proposed: x.proposed,
          }));
        };
        newState.stats = await formatConsensus();
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

  const getIdentity = async (identity: string) => {
    try {
      const { data: identityData } = await axios.get(IDENTITY(identity));
      return identityData.name;
    } catch (error) {
      return null;
    }
  };

  const getConsensus = async ({
    validator, shard, epoch,
  }) => {
    const { data: roundsData } = await axios.get(ROUNDS, {
      params: {
        size: 100,
        from: 0,
        validator,
        shard,
        epoch,
      },
    });

    return roundsData || [];
  };

  const getEpoch = async () => {
    const { data: statsData } = await axios.get(STATS);
    return R.pathOr(0, ['epoch'], statsData);
  };

  return ({
    state,
  });
};
