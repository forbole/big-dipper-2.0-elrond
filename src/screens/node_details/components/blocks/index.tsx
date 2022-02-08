import React from 'react';
import classnames from 'classnames';
import {
  Box,
} from '@components';

const Blocks: React.FC<ComponentDefault> = (props) => {
  return (
    <Box className={classnames(props.className)}>
      blocks
    </Box>
  );
};

export default Blocks;
