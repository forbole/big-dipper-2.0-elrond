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
      width: 45,
      sort: true,
    },
    {
      key: 'stake',
      sortKey: 'stakePercent',
      width: 25,
      sort: true,
    },
    {
      key: 'nodes',
      sortKey: 'nodes',
      align: 'right',
      width: 25,
      sort: true,
    },
  ]);
};
