import React from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import {
  Typography, Divider,
} from '@material-ui/core';
import { ACCOUNT_DETAILS } from '@utils/go_to_page';
import { useStyles } from './styles';
import { OperationType } from '../../../../types';

const Mobile: React.FC<{items: OperationType[]} & ComponentDefault> = (props) => {
  const { t } = useTranslation('transactions');
  const classes = useStyles();
  const formattedItems = props.items.map((x) => {
    return ({
      action: x.action.replace(/([A-Z])/g, ' $1').toUpperCase(),
      identifier: x.identifier,
      sender: (
        <Link href={ACCOUNT_DETAILS(x.sender)} passHref>
          <Typography variant="body1" className="value" component="a">
            {getMiddleEllipsis(x.sender, {
              beginning: 13, ending: 15,
            })}
          </Typography>
        </Link>
      ),
      receiver: (
        <Link href={ACCOUNT_DETAILS(x.receiver)} passHref>
          <Typography variant="body1" className="value" component="a">
            {getMiddleEllipsis(x.receiver, {
              beginning: 13, ending: 15,
            })}
          </Typography>
        </Link>
      ),
    });
  });

  return (
    <div className={props.className}>
      {formattedItems.map((x, i) => {
        return (
          <React.Fragment key={`${x.action}-${i}`}>
            <div className={classes.root}>
              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('action')}
                </Typography>
                {x.action}
              </div>
              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('sender')}
                </Typography>
                {x.sender}
              </div>

              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('receiver')}
                </Typography>
                <Typography variant="body1" className="value">
                  {x.receiver}
                </Typography>
              </div>
              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('identifier')}
                </Typography>
                <Typography variant="body1" className="value">
                  {x.identifier}
                </Typography>
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
