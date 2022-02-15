import React from 'react';
import { Typography } from '@material-ui/core';
import numeral from 'numeral';
import Link from 'next/link';
import {
  BoxDetails,
  Result,
  AvatarName,
} from '@components';
import dayjs, { formatDayJs } from '@utils/dayjs';
import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';
import { readDate } from '@recoil/settings';
import { MINIBLOCK_DETAILS } from '@utils/go_to_page';
import { formatNumber } from '@utils/format_token';
import { getShardDisplay } from '@utils/get_shard_display';
import { chainConfig } from '@configs';
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
      detail: (
        <Link href={MINIBLOCK_DETAILS(props.miniblockHash)} passHref>
          <Typography variant="body1" component="a">
            {props.miniblockHash}
          </Typography>
        </Link>
      ),
    },
    {
      label: t('from'),
      detail: (
        <div>
          <Typography component="span">
            (
            {t(senderShard.key, {
              num: senderShard.num,
            })}
            )
            {' '}
          </Typography>
          <AvatarName
            address={props.from}
            name={props.from}
          />
        </div>
      ),
    },
    {
      label: t('to'),
      detail: (
        <div>
          <Typography component="span">
            (
            {t(receiverShard.key, {
              num: receiverShard.num,
            })}
            )
            {' '}
          </Typography>
          <AvatarName
            address={props.to}
            name={props.to}
          />
        </div>
      ),
    },
    {
      label: t('tokenPrice', { token: chainConfig.primaryTokenUnit.toUpperCase() }),
      detail: `$${props.price}`,
    },
    {
      label: t('gasUsedLimit'),
      detail: `${numeral(props.gasUsed).format('0,0')} / ${numeral(props.gasLimit).format('0,0')}`,
    },
    {
      label: t('gasPrice'),
      detail: `${formatNumber(props.gasPrice.value, props.gasPrice.exponent)} ${props.gasPrice.displayDenom.toUpperCase()}`,
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
