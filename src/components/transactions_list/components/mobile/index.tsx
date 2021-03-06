import React from 'react';
import dayjs from '@utils/dayjs';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import {
  Typography, Divider,
} from '@material-ui/core';
import {
  Result, AvatarName,
} from '@components';
import { TRANSACTION_DETAILS } from '@utils/go_to_page';
import { useStyles } from './styles';
import { Shard } from '..';

const Mobile: React.FC<{items: TransactionType[]} & ComponentDefault> = (props) => {
  const { t } = useTranslation('transactions');
  const classes = useStyles();
  const formattedItems = props.items.map((x) => {
    return ({
      hash: (
        <Link href={TRANSACTION_DETAILS(x.hash)} passHref>
          <Typography variant="body1" className="value" component="a">
            {getMiddleEllipsis(x.hash, {
              beginning: 13, ending: 15,
            })}
          </Typography>
        </Link>
      ),
      shard: <Shard to={x.toShard} from={x.fromShard} />,
      from: (
        <AvatarName
          address={x.from}
          name={getMiddleEllipsis(x.from, {
            beginning: 13, ending: 15,
          })}
        />
      ),
      to: (
        <AvatarName
          address={x.to}
          name={getMiddleEllipsis(x.to, {
            beginning: 13, ending: 15,
          })}
        />
      ),
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
                {x.from}
              </div>
              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('to')}
                </Typography>
                {x.to}
              </div>
              <div className={classes.flex}>
                <div className={classes.item}>
                  <Typography variant="h4" className="label">
                    {t('status')}
                  </Typography>
                  {x.status}
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
