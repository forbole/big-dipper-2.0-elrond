import React from 'react';
import dayjs from '@utils/dayjs';
import useTranslation from 'next-translate/useTranslation';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import {
  Typography, Divider,
} from '@material-ui/core';
import { Result } from '@components';
import { useStyles } from './styles';
import { Shard } from '..';

const Mobile: React.FC<{items: TransactionType[]} & ComponentDefault> = (props) => {
  const { t } = useTranslation('transactions');
  const classes = useStyles();
  const formattedItems = props.items.map((x) => {
    return ({
      hash: getMiddleEllipsis(x.hash, {
        beginning: 13, ending: 15,
      }),
      shard: <Shard to={x.toShard} from={x.fromShard} />,
      from: x.from,
      to: x.to,
      status: (
        <Result status={x.status} />
      ),
      time: dayjs.utc(dayjs.unix(x.timestamp)).fromNow(),
    });
  });

  return (
    <div className={props.className}>
      {formattedItems.map((x, i) => {
        return (
          <React.Fragment key={`${x.hash}-${i}`}>
            <div className={classes.root}>
              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('hash')}
                </Typography>
                {x.hash}
              </div>
              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('shard')}
                </Typography>
                {x.shard}
              </div>

              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('from')}
                </Typography>
                <Typography variant="body1" className="value">
                  {x.from}
                </Typography>
              </div>
              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('to')}
                </Typography>
                <Typography variant="body1" className="value">
                  {x.to}
                </Typography>
              </div>
              <div className={classes.flex}>
                <div className={classes.item}>
                  <Typography variant="h4" className="label">
                    {t('status')}
                  </Typography>
                  <Typography variant="body1" className="value">
                    {x.status}
                  </Typography>
                </div>
                <div className={classes.item}>
                  <Typography variant="h4" className="label">
                    {t('time')}
                  </Typography>
                  <Typography variant="body1" className="value">
                    {x.time}
                  </Typography>
                </div>
              </div>
            </div>
            {i !== formattedItems.length - 1 && <Divider />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Mobile;
