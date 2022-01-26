import React from 'react';
import { BoxDetails } from '@components';
import useTranslation from 'next-translate/useTranslation';
import { ActionType } from '../../types';

const Action: React.FC<ActionType & ComponentDefault> = (props) => {
  const { t } = useTranslation('transactions');

  const details = [
    {
      label: t('category'),
      detail: props.category.toUpperCase(),
    },
    {
      label: t('name'),
      detail: props.name.replace(/([A-Z])/g, ' $1').toUpperCase(),
    },
    {
      label: t('description'),
      detail: props.description.toUpperCase(),
    },
  ];

  return (
    <BoxDetails
      className={props.className}
      title={t('action')}
      details={details}
    />
  );
};

export default Action;
