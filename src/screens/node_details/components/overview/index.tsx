import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import classnames from 'classnames';
import { Typography } from '@material-ui/core';
import {
  Box,
} from '@components';
import { useStyles } from './style';

const Overview: React.FC<ComponentDefault> = (props) => {
  const { t } = useTranslation('nodes');
  const classes = useStyles();
  return (
    <Box className={classnames(props.className)}>
      <Typography className={classes.title} variant="h2">{t('overview')}</Typography>
      <div className={classes.body}>
        <div>item</div>
      </div>
    </Box>
  );
};

export default Overview;
