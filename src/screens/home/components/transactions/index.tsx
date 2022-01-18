import React from 'react';
import classnames from 'classnames';
import {
  Box, NoData,
} from '@components';

const Transactions: React.FC<ComponentDefault> = (props) => {
  return (
    <Box className={classnames(props.className)}>
      Transactions
    </Box>
  );
};

export default Transactions;
