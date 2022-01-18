import React from 'react';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import {
  Layout,
} from '@components';
import { useStyles } from './styles';

const BlockDetails = () => {
  const classes = useStyles();
  const { t } = useTranslation('blocks');
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
        block details
      </Layout>
    </>
  );
};

export default BlockDetails;
