import React from 'react';
import numeral from 'numeral';
import { Typography } from '@material-ui/core';
import { BoxDetails } from '@components';
import dayjs, { formatDayJs } from '@utils/dayjs';
import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';
import { readDate } from '@recoil/settings';
import { formatBytes } from '@utils/format_bytes';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { OverviewType } from '../../types';

const Overview: React.FC<OverviewType & ComponentDefault> = (props) => {
  const { t } = useTranslation('blocks');
  const dateFormat = useRecoilValue(readDate);

  const details = [
    {
      label: t('block'),
      detail: (
        <Typography variant="body1" className="value">
          {numeral(props.block).format('0,0')}
        </Typography>
      ),
    },
    {
      label: t('hash'),
      detail: props.hash,
    },
    {
      label: t('proposer'),
      detail: (
        <Typography variant="body1" className="value">
          {getMiddleEllipsis(props.proposer, {
            beginning: 13, ending: 15,
          })}
        </Typography>
      ),
    },
    {
      label: t('txs'),
      detail: (
        <Typography variant="body1" className="value">
          {numeral(props.txs).format('0,0')}
        </Typography>
      ),
    },
    {
      label: t('time'),
      detail: formatDayJs(dayjs.utc(dayjs.unix(props.timestamp)), dateFormat),
    },
    {
      label: t('shard'),
      detail: (
        <Typography variant="body1" className="value">
          {props.shard}
        </Typography>
      ),
    },
    {
      label: t('size'),
      detail: (
        <Typography variant="body1" className="value">
          {formatBytes(props.size)}
        </Typography>
      ),
    },
  ];

  return (
    <BoxDetails
      className={props.className}
      title={t('overview')}
      details={details}
    />
  );
};

export default Overview;
