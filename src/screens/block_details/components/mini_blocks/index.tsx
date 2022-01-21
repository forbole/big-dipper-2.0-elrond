import React from 'react';
import classnames from 'classnames';
import { Box } from '@components';
import useTranslation from 'next-translate/useTranslation';
import {
  Typography,
  Divider,
} from '@material-ui/core';
import { MiniBlockType } from '../../types';
import { useStyles } from './styles';

const MiniBlocks: React.FC<{miniBlocks: MiniBlockType[]} & ComponentDefault> = (props) => {
  const { t } = useTranslation('blocks');
  const classes = useStyles();
  return (
    <Box className={classnames(props.className, classes.root)}>
      <Typography className={classes.title} variant="h2">{t('miniBlocks')}</Typography>
      <div className={classes.listContainer}>
        {props.miniBlocks.map((x, i) => {
          return (
            <div key={x}>
              <Typography className={classes.block}>
                {x}
              </Typography>
              {i !== props.miniBlocks.length - 1 && <Divider className={classes.divider} />}
            </div>
          );
        })}
      </div>
    </Box>
  );
};

export default MiniBlocks;
