import React from 'react';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import {
  Layout,
  TransactionsList,
  Box,
} from '@components';
import {
  Overview,
  Data,
} from './components';
import { useTransactionDetails } from './hooks';
import { useStyles } from './styles';

const TransactionDetails = () => {
  const classes = useStyles();
  const { t } = useTranslation('transactions');
  const { state } = useTransactionDetails();
  return (
    <>
      <NextSeo
        title={t('transactionDetails')}
        openGraph={{
          title: t('transactionDetails'),
        }}
      />
      <Layout
        navTitle={t('transactionDetails')}
        className={classes.root}
      >
        <Overview {...state.overview} />
        {!!state.data && (
          <Data data={state.data} />
        )}
        {/* <Box>
          <TransactionsList items={state.transactions} />
        </Box> */}
      </Layout>
    </>
  );
};

export default TransactionDetails;
