import React from 'react';
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
import { ACCOUNT_DETAILS } from '@utils/go_to_page';
import { columns } from './utils';
import { OperationType } from '../../../../types';

const Desktop: React.FC<{items: OperationType[]} & ComponentDefault> = (props) => {
  const { t } = useTranslation('transactions');
  const formattedItems = props.items.map((x) => {
    return ({
      action: x.action.replace(/([A-Z])/g, ' $1').toUpperCase(),
      identifier: x.identifier,
      sender: (
        <Link href={ACCOUNT_DETAILS(x.sender)} passHref>
          <Typography variant="body1" className="value" component="a">
            {getMiddleEllipsis(x.sender, {
              beginning: 13, ending: 15,
            })}
          </Typography>
        </Link>
      ),
      receiver: (
        <Link href={ACCOUNT_DETAILS(x.receiver)} passHref>
          <Typography variant="body1" className="value" component="a">
            {getMiddleEllipsis(x.receiver, {
              beginning: 13, ending: 15,
            })}
          </Typography>
        </Link>
      ),
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
