import React from 'react';
import classnames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { Result } from '@components';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import dayjs from '@utils/dayjs';
import { columns } from './utils';
import { useStyles } from './styles';
import { TransactionType } from '../../types';

const Desktop:React.FC<{ items: TransactionType[] } &ComponentDefault> = (props) => {
  const { t } = useTranslation('transactions');
  const classes = useStyles();
  const formattedItems = props.items.map((x) => {
    return ({
      hash: getMiddleEllipsis(x.hash, {
        beginning: 10, ending: 10,
      }),
      from: getMiddleEllipsis(x.from, {
        beginning: 5, ending: 5,
      }),
      to: getMiddleEllipsis(x.to, {
        beginning: 5, ending: 5,
      }),
      status: (
        <Result status={x.status} />
      ),
      time: dayjs.utc(dayjs.unix(x.timestamp)).fromNow(),
    });
  });
  return (
    <div className={classnames(props.className, classes.root)}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              return (
                <TableCell
                  key={column.key}
                  align={column.align}
                  style={{ width: `${column.width}%` }}
                >
                  {t(column.key)}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedItems.map((row, i) => (
            <TableRow key={`holders-row-${i}`}>
              {columns.map((column) => {
                return (
                  <TableCell
                    key={`holders-row-${i}-${column.key}`}
                    align={column.align}
                    style={{ width: `${column.width}%` }}
                  >
                    {row[column.key]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Desktop;
