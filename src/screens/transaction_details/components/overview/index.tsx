import React from 'react';
import { Typography } from '@material-ui/core';
import Link from 'next/link';
import {
  BoxDetails, Result,
} from '@components';
import dayjs, { formatDayJs } from '@utils/dayjs';
import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';
import { readDate } from '@recoil/settings';
import { ACCOUNT_DETAILS } from '@utils/go_to_page';
import { getShardDisplay } from '@utils/get_shard_display';
import { OverviewType } from '../../types';

const Overview: React.FC<OverviewType & ComponentDefault> = (props) => {
  const { t } = useTranslation('transactions');
  const dateFormat = useRecoilValue(readDate);
  const senderShard = getShardDisplay(props.fromShard);
  const receiverShard = getShardDisplay(props.toShard);

  const details = [
    {
      label: t('hash'),
      detail: props.hash,
    },
    {
      label: t('status'),
      detail: (
        <Result status={props.status} />
      ),
    },
    {
      label: t('miniblockHash'),
      detail: props.miniblockHash,
    },
    {
      label: t('senderShard'),
      detail: t(senderShard.key, {
        num: senderShard.num,
      }),
    },
    {
      label: t('receiverShard'),
      detail: t(receiverShard.key, {
        num: receiverShard.num,
      }),
    },
    {
      label: t('from'),
      detail: (
        <Link href={ACCOUNT_DETAILS(props.from)} passHref>
          <Typography variant="body1" component="a">
            {props.from}
          </Typography>
        </Link>
      ),
    },
    {
      label: t('to'),
      detail: (
        <Link href={ACCOUNT_DETAILS(props.to)} passHref>
          <Typography variant="body1" component="a">
            {props.to}
          </Typography>
        </Link>
      ),
    },
    {
      label: t('time'),
      detail: formatDayJs(dayjs.utc(dayjs.unix(props.timestamp)), dateFormat),
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
