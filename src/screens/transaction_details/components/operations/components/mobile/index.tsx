import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { formatNumber } from '@utils/format_token';
import {
  Typography, Divider,
} from '@material-ui/core';
import { AvatarName } from '@components';
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
        <AvatarName
          address={x.sender}
          name={x.sender}
        />
      ),
      receiver: (
        <AvatarName
          address={x.receiver}
          name={x.receiver}
        />
      ),
      value: `${formatNumber(x.value.value, x.value.exponent)} ${x.value.displayDenom.toUpperCase()}`,
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
                {x.receiver}
              </div>
              <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('value')}
                </Typography>
                <Typography variant="body1" className="value">
                  {x.value}
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
