import React from 'react';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import {
  Layout,
  LoadAndExist,
} from '@components';
import {
  Profile,
  Overview,
  Stats,
  Consensus,
  Blocks,
} from './components';
import { useNodeDetails } from './hooks';
import { useStyles } from './styles';

const NodeDetails = () => {
  const classes = useStyles();
  const { t } = useTranslation('nodes');
  const { state } = useNodeDetails();
  return (
    <>
      <NextSeo
        title={t('nodeDetails')}
        openGraph={{
          title: t('nodeDetails'),
        }}
      />
      <Layout
        navTitle={t('nodeDetails')}
        className={classes.root}
      >
        <LoadAndExist
          loading={state.loading}
          exists={state.exists}
        >
          <Profile className={classes.profile} profile={state.profile} />
          <Overview className={classes.overview} overview={state.overview} />
          <Stats className={classes.stats} stats={state.stats} />
          <Consensus className={classes.consensus} />
          <Blocks className={classes.blocks} />
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default NodeDetails;
