import React from 'react';
import numeral from 'numeral';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import {
  BoxDetails,
} from '@components';
import { ACCOUNT_DETAILS } from '@utils/go_to_page';
import { formatNumber } from '@utils/format_token';
import { Typography } from '@material-ui/core';
import { ContractType } from '../../types';

const ContractDetails: React.FC<{contract: ContractType} & ComponentDefault> = (props) => {
  const { t } = useTranslation('validators');
  const details = [
    {
      label: t('address'),
      detail: (
        <Link href={ACCOUNT_DETAILS(props.contract.address)} passHref>
          <Typography variant="body1" className="value" component="a">
            {props.contract.address}
          </Typography>
        </Link>
      ),
    },
    {
      label: t('locked'),
      detail: `${formatNumber(props.contract.locked.value, 2)} ${props.contract.locked.displayDenom.toUpperCase()}`,
    },
    {
      label: t('apr'),
      detail: `${props.contract.apr}%`,
    },
    {
      label: t('commission'),
      detail: `${numeral(props.contract.commission * 100).format('0,0.[00]')}%`,
    },
    {
      label: t('delegation'),
      detail: `${formatNumber(props.contract.locked.value, 2)} ${props.contract.locked.displayDenom.toUpperCase()} / ${formatNumber(props.contract.delegationCap.value, 2)} ${props.contract.delegationCap.displayDenom.toUpperCase()}`,
    },
    {
      label: t('nodes'),
      detail: numeral(props.contract.nodes).format('0,0'),
    },
  ];

  return (
    <BoxDetails
      className={props.className}
      title={t('contract')}
      details={details}
    />
  );
};

export default ContractDetails;
