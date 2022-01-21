import React from 'react';
import { Box } from '@components';
import useTranslation from 'next-translate/useTranslation';
import { Typography } from '@material-ui/core';
import { MiniBlockType } from '../../types';
import { useStyles } from './styles';

const MiniBlocks: React.FC<MiniBlockType & ComponentDefault> = (props) => {
  const { t } = useTranslation('blocks');
  const classes = useStyles();
  return (
    <Box className={props.className}>
      <Typography className={classes.title} variant="h2">{t('miniBlocks')}</Typography>
    </Box>
  );
};

export default MiniBlocks;
