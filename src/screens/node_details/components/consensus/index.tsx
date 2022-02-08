import React from 'react';
import classnames from 'classnames';
import {
  Box,
} from '@components';

const Consensus: React.FC<ComponentDefault> = (props) => {
  return (
    <Box className={classnames(props.className)}>
      Consensus
    </Box>
  );
};

export default Consensus;
