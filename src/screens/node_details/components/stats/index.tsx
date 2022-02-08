import React from 'react';
import classnames from 'classnames';
import {
  Box,
} from '@components';

const Stats: React.FC<ComponentDefault> = (props) => {
  return (
    <Box className={classnames(props.className)}>
      Stats
    </Box>
  );
};

export default Stats;
