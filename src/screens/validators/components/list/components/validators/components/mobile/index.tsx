import React from 'react';
import classnames from 'classnames';
import numeral from 'numeral';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Divider } from '@material-ui/core';
import { AvatarName } from '@components';
import {
  VALIDATOR_DETAILS, NODE_DETAILS,
} from '@utils/go_to_page';
import {
  useList,
  useListRow,
} from '@hooks';
import { formatNumber } from '@utils/format_token';
import { SingleValidator } from './component';
import { VotingPower } from '..';
import { ValidatorType } from '../../../../types';
import { useStyles } from './styles';

const Mobile: React.FC<{
  className?: string;
  items: ValidatorType[];
}> = ({
  className, items,
}) => {
  const classes = useStyles();
  const {
    listRef,
    getRowHeight,
    setRowHeight,
  } = useList();

  const formattedItems = items.map((x, i) => {
    return ({
      idx: `#${i + 1}`,
      validator: (
        <AvatarName
          address={x.validator.address}
          imageUrl={x.validator.imageUrl}
          name={x.validator.name}
          href={x.isNode ? NODE_DETAILS : VALIDATOR_DETAILS}
        />
      ),
      locked: (
        <VotingPower
          percentDisplay={`${x.stakePercent}%`}
          percentage={x.stakePercent}
          content={formatNumber(x.locked.value, 2)}
        />
      ),
      stake: `${formatNumber(x.stake.value, x.stake.exponent)} ${x.stake.displayDenom.toUpperCase()}`,
      nodes: x.nodes ? numeral(x.nodes).format('0,0') : '-',
      delegators: x.delegators ? numeral(x.delegators).format('0,0') : '-',
      commission: x.commission ? `${numeral(x.commission * 100).format('0,0.[00]')}%` : '-',
      apr: x.apr ? `${x.apr}%` : '-',
    });
  });

  return (
    <div className={classnames(className, classes.root)}>
      <AutoSizer>
        {({
          height, width,
        }) => {
          return (
            <List
              className="List"
              height={height}
              itemCount={formattedItems.length}
              itemSize={getRowHeight}
              ref={listRef}
              width={width}
            >
              {({
                index, style,
              }) => {
                const { rowRef } = useListRow(index, setRowHeight);
                const selectedItem = formattedItems[index];
                return (
                  <div style={style}>
                    <div ref={rowRef}>
                      <SingleValidator {... selectedItem} />
                      {index !== formattedItems.length - 1 && <Divider />}
                    </div>
                  </div>
                );
              }}
            </List>
          );
        }}
      </AutoSizer>
    </div>
  );
};

export default Mobile;
