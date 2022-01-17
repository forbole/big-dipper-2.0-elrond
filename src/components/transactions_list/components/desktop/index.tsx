import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { Result } from '@components';
import dayjs from '@utils/dayjs';
import { columns } from './utils';
import { Shard } from '..';

const Desktop: React.FC<{items: TransactionType[]} & ComponentDefault> = (props) => {
  const { t } = useTranslation('transactions');
  const formattedItems = props.items.map((x) => {
    return ({
      hash: getMiddleEllipsis(x.hash, {
        beginning: 20, ending: 20,
      }),
      shard: <Shard to={x.toShard} from={x.fromShard} />,
      from: getMiddleEllipsis(x.from, {
        beginning: 10, ending: 10,
      }),
      to: getMiddleEllipsis(x.to, {
        beginning: 10, ending: 10,
      }),
      status: (
        <Result status={x.status} />
      ),
      time: dayjs.utc(dayjs.unix(x.timestamp)).fromNow(),
    });
  });
  return (
    <div className={props.className}>
      <Table>
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
