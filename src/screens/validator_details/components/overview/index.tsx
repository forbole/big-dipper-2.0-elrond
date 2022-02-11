import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
  BoxDetails,
} from '@components';
import { OverviewType } from '../../types';

const Overview: React.FC<{overview: OverviewType} & ComponentDefault> = (props) => {
  const { t } = useTranslation('validators');
  const details = [
    {
      label: t('website'),
      detail: (
        props.overview.website ? (
          <a
            href={props.overview.website}
            target="_blank"
            rel="noreferrer"
          >
            {props.overview.website}
          </a>
        ) : '-'
      ),
    },
    {
      label: t('location'),
      detail: props.overview.location || '-',
    },
    {
      label: t('identity'),
      detail: props.overview.identity || '-',
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
