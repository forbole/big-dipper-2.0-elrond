import React from 'react';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import { Typography } from '@material-ui/core';
import {
  Layout,
  TransactionsList,
  Box,
  LoadAndExist,
} from '@components';
import {
  Overview, Transactions,
} from './components';
import { useBlockDetails } from './hooks';
import { useStyles } from './styles';

const MiniBlockDetails = () => {
  const classes = useStyles();
  const { t } = useTranslation('blocks');
  const { state } = useBlockDetails();
  return (
    <>
      <NextSeo
        title={t('miniBlockDetails')}
        openGraph={{
          title: t('miniBlockDetails'),
        }}
      />
      <Layout
        navTitle={t('miniBlockDetails')}
        className={classes.root}
      >
        <LoadAndExist
          loading={state.loading}
          exists={state.exists}
        >
          <Overview {...state.overview} />
          <Transactions />
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default MiniBlockDetails;
