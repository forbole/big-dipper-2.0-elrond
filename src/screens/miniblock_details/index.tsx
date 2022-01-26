import React from 'react';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import {
  Layout,
} from '@components';
import {
// Overview,
// MiniBlocks,
// Consensus,
} from './components';
import { useBlockDetails } from './hooks';
import { useStyles } from './styles';

const MiniBlockDetails = () => {
  const classes = useStyles();
  const { t } = useTranslation('blocks');
  // const { state } = useBlockDetails();
  return (
    <>
      <NextSeo
        title={t('miniBlockDetails')}
        openGraph={{
          title: t('miniBlockDetails'),
        }}
      />
      <Layout
        navTitle={t('blockDetails')}
        className={classes.root}
      >
        mini block
        {/* <Overview {...state.overview} />
        {!!state.miniBlocks.length && (
          <MiniBlocks miniBlocks={state.miniBlocks} />
        )}
        <Consensus className={classes.consensus} consensus={state.consensus} /> */}
      </Layout>
    </>
  );
};

export default MiniBlockDetails;
