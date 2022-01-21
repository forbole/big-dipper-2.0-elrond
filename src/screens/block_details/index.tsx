import React from 'react';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import {
  Layout,
} from '@components';
import {
  Overview,
  MiniBlocks,
} from './components';
import { useBlockDetails } from './hooks';
import { useStyles } from './styles';

const BlockDetails = () => {
  const classes = useStyles();
  const { t } = useTranslation('blocks');
  const { state } = useBlockDetails();
  return (
    <>
      <NextSeo
        title={t('blockDetails')}
        openGraph={{
          title: t('blockDetails'),
        }}
      />
      <Layout
        navTitle={t('blockDetails')}
        className={classes.root}
      >
        <Overview {...state.overview} />
        <MiniBlocks {...state.miniBlocks} />
      </Layout>
    </>
  );
};

export default BlockDetails;
