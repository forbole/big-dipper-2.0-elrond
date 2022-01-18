import React from 'react';
import {
  Layout,
} from '@components';
import { useStyles } from './styles';
import {
  DataBlocks,
} from './components';

const Home = () => {
  const classes = useStyles();
  return (
    <Layout className={classes.root}>
      <DataBlocks
        className={classes.dataBlocks}
      />
    </Layout>
  );
};

export default Home;
