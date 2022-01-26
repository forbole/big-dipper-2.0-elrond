import React from 'react';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import {
  Layout,
  TransactionsList,
  Box,
} from '@components';
import { Overview } from './components';
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
        <Overview {...state.overview} />
        <Box>
          <TransactionsList items={state.transactions} />
        </Box>
      </Layout>
    </>
  );
};

export default MiniBlockDetails;
