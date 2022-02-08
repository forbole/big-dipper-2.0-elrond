import React from 'react';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import {
  Layout,
  LoadAndExist,
} from '@components';
import { Profile } from './components';
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
          <Profile profile={state.profile} />
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default NodeDetails;
