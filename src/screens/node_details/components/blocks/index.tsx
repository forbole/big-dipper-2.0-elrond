import React from 'react';
import classnames from 'classnames';
import {
  Box,
  BlocksList,
} from '@components';

const Blocks: React.FC<{blocks: BlockType[]} & ComponentDefault> = (props) => {
  return (
    <Box className={classnames(props.className)}>
      <BlocksList items={props.blocks} />
    </Box>
  );
};

export default Blocks;
