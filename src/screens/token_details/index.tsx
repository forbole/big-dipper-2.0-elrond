import React from 'react';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import {
  Layout,
} from '@components';
import {
  Profile,
  Overview,
  Stats,
  Transactions,
} from './components';
import { useStyles } from './styles';

const TokenDetails = () => {
  const classes = useStyles();
  const { t } = useTranslation('tokens');

  return (
    <>
      <NextSeo
        title={t('tokenDetails')}
        openGraph={{
          title: t('tokenDetails'),
        }}
      />
      <Layout
        navTitle={t('tokenDetails')}
        className={classes.root}
      >
        <Profile />
        <Overview />
        <Stats />
        <Transactions />
      </Layout>
    </>
  );
};

export default TokenDetails;
