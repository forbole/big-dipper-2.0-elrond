import React from 'react';
import {
  Layout,
} from '@components';
import { useStyles } from './styles';
import {
  DataBlocks,
  Blocks,
  Transactions,
  Epoch,
} from './components';

const Home = () => {
  const classes = useStyles();
  return (
    <Layout className={classes.root}>
      <DataBlocks className={classes.dataBlocks} />
      <Epoch className={classes.epoch} />
      <Blocks className={classes.blocks} />
      <Transactions className={classes.transactions} />
    </Layout>
  );
};

export default Home;
