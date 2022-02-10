import React from 'react';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import {
  Layout,
  LoadAndExist,
} from '@components';
import { useValidatorDetails } from './hooks';
import {
  Profile,
  Stake,
  Details,
  ContractDetails,
  Nodes,
} from './components';
import { useStyles } from './styles';

const NodeDetails = () => {
  const classes = useStyles();
  const { t } = useTranslation('validators');
  const { state } = useValidatorDetails();
  return (
    <>
      <NextSeo
        title={t('validatorDetails')}
        openGraph={{
          title: t('validatorDetails'),
        }}
      />
      <Layout
        navTitle={t('validatorDetails')}
      >
        <LoadAndExist
          loading={state.loading}
          exists={state.exists}
        >
          <div className={classes.root}>
            <Profile className={classes.profile} />
            <Stake className={classes.stake} />
            <Details className={classes.details} />
            <ContractDetails className={classes.contractDetails} />
            <Nodes className={classes.nodes} />
          </div>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default NodeDetails;
