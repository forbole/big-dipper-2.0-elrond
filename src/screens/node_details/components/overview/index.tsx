import React from 'react';
import classnames from 'classnames';
import {
  Box,
} from '@components';

const Overview: React.FC<ComponentDefault> = (props) => {
  return (
    <Box className={classnames(props.className)}>
      Node overview
    </Box>
  );
};

export default Overview;
