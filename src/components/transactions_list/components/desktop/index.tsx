import React from 'react';
import classnames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@material-ui/core';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import {
  TRANSACTION_DETAILS, ACCOUNT_DETAILS,
} from '@utils/go_to_page';
import { Result } from '@components';
import dayjs from '@utils/dayjs';
import { columns } from './utils';
import { useStyles } from './styles';
import { Shard } from '..';

const Desktop: React.FC<{items: TransactionType[]} & ComponentDefault> = (props) => {
  const { t } = useTranslation('transactions');
  const classes = useStyles();
  const formattedItems = props.items.map((x) => {
    return ({
      hash: (
        <Link href={TRANSACTION_DETAILS(x.hash)} passHref>
          <Typography variant="body1" className="value" component="a">
            {getMiddleEllipsis(x.hash, {
              beginning: 13, ending: 15,
            })}
          </Typography>
        </Link>
      ),
      shard: <Shard to={x.toShard} from={x.fromShard} />,
      from: (
        <Link href={ACCOUNT_DETAILS(x.from)} passHref>
          <Typography variant="body1" className="value" component="a">
            {getMiddleEllipsis(x.from, {
              beginning: 13, ending: 15,
            })}
          </Typography>
        </Link>
      ),
      to: (
        <Link href={ACCOUNT_DETAILS(x.to)} passHref>
          <Typography variant="body1" className="value" component="a">
            {getMiddleEllipsis(x.to, {
              beginning: 13, ending: 15,
            })}
          </Typography>
        </Link>
      ),
      status: (
        <Result status={x.status} />
      ),
      time: dayjs.utc(dayjs.unix(x.timestamp)).fromNow(),
    });
  });
  return (
    <div className={classnames(props.className, classes.root)}>
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
