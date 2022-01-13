import React from 'react';
import {
  Layout,
} from '@components';
import { useStyles } from './styles';
import {
  DataBlocks,
} from './components';
import {
  useDataBlocks,
} from './hooks';

const Home = () => {
  const classes = useStyles();
  const { state: dataBlocksState } = useDataBlocks();
  return (
    <Layout className={classes.root}>
      <DataBlocks
        {...dataBlocksState}
        className={classes.dataBlocks}
      />
    </Layout>
  );
};

export default Home;
