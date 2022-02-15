import React from 'react';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import {
  Layout,
  LoadAndExist,
} from '@components';
import { useStyles } from './styles';
import { useAccountDetails } from './hooks';
import {
  Profile,
  Transactions,
  Overview,
} from './components';

const AccountDetails = () => {
  const classes = useStyles();
  const { t } = useTranslation('accounts');
  const { state } = useAccountDetails();
  return (
    <>
      <NextSeo
        title={t('accountDetails')}
        openGraph={{
          title: t('accountDetails'),
        }}
      />
      <Layout
        navTitle={t('accountDetails')}
      >
        <LoadAndExist
          loading={state.loading}
          exists={state.exists}
        >
          <div className={classes.root}>
            <Profile className={classes.profile} profile={state.profile} />
            <Overview className={classes.overview} />
            <Transactions className={classes.transactions} />
          </div>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default AccountDetails;
