import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import classnames from 'classnames';
import { Typography } from '@material-ui/core';
import {
  Box,
} from '@components';
import { type } from 'os';
import { useStyles } from './style';
import { OverviewType } from '../../types';

const Overview: React.FC<{overview: OverviewType} & ComponentDefault> = (props) => {
  const { t } = useTranslation('nodes');
  const classes = useStyles();
  const items = [
    {
      key: t('shard'),
      value: props.overview.shard,
    },
    {
      key: t('instances'),
      value: props.overview.instances,
    },
    {
      key: t('type'),
      value: `${props.overview.type.toUpperCase()} (${props.overview.status})`,
    },
    {
      key: t('networkStatus'),
      value: props.overview.online ? t('online') : t('offline'),
    },
  ];

  return (
    <Box className={classnames(props.className)}>
      <Typography className={classes.title} variant="h2">{t('overview')}</Typography>
      <div className={classes.body}>
        {items.map((x) => {
          return (
            <div key={x.key} className={classes.item}>
              <div className={classes.hash}>
                <div className={classes.bullet} />
                <div>
                  <Typography variant="body1" className="item__key">
                    {x.key}
                  </Typography>
                  {React.isValidElement(x.value) ? (
                    <div>
                      {x.value}
                    </div>
                  ) : (
                    <Typography variant="body1">
                      {x.value}
                    </Typography>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Box>
  );
};

export default Overview;
