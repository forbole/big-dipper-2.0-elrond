import React from 'react';
import classnames from 'classnames';
import numeral from 'numeral';
import useTranslation from 'next-translate/useTranslation';
import { DataBlockState } from '../../types';
import { SingleBlock } from './components';
import { useStyles } from './styles';

const DataBlocks: React.FC<DataBlockState & ComponentDefault> = (props) => {
  const { t } = useTranslation('home');
  const classes = useStyles();

  const data = [
    {
      key: t('latestBlock'),
      value: numeral(props.blockHeight).format('0,0'),
      className: classes.blockHeight,
    },
    {
      key: t('transactions'),
      value: `${numeral(props.transactions).format('0,0')}`,
      className: classes.blockTime,
    },
    {
      key: t('price'),
      value: 'N/A',
      className: classes.price,
    },
    {
      key: t('nodes'),
      value: numeral(props.nodes).format('0,0'),
      className: classes.validators,
    },
  ];

  return (
    <div className={classnames(classes.root, props.className)}>
      {data.map((x) => (
        <SingleBlock
          key={x.key}
          label={x.key}
          value={x.value}
          className={x.className}
        />
      ))}
    </div>
  );
};

export default DataBlocks;
