import React from 'react';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import {
  Layout,
} from '@components';
import {
  List,
} from './components';
import { useStyles } from './styles';

const Tokens = () => {
  const classes = useStyles();
  const { t } = useTranslation('tokens');

  return (
    <>
      <NextSeo
        title={t('tokens')}
        openGraph={{
          title: t('tokens'),
        }}
      />
      <Layout
        navTitle={t('tokens')}
        className={classes.root}
      >
        <List />
      </Layout>
    </>
  );
};

export default Tokens;
