import React from 'react';

export const fetchColumns = (): {
  key: string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  width: number;
  component?: React.ReactNode;
  sortKey?: string;
  sort?: boolean;
}[] => {
  return ([
    {
      key: 'idx',
      width: 5,
    },
    {
      key: 'validator',
      sortKey: 'validator.name',
      width: 30,
      sort: true,
    },
    {
      key: 'stake',
      sortKey: 'stake.value',
      align: 'right',
      width: 20,
      sort: true,
    },
    {
      key: 'commission',
      sortKey: 'commission',
      align: 'right',
      width: 15,
      sort: true,
    },
    {
      key: 'apr',
      sortKey: 'apr',
      align: 'right',
      width: 15,
      sort: true,
    },
    {
      key: 'nodes',
      sortKey: 'nodes',
      align: 'right',
      width: 15,
      sort: true,
    },
  ]);
};
