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
      key: 'locked',
      sortKey: 'stakePercent',
      width: 35,
      sort: true,
    },
    {
      key: 'stake',
      sortKey: 'stakePercent',
      width: 15,
      sort: true,
      align: 'right',
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
