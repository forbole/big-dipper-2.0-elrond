export const columns:{
  key: string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  width: number;
}[] = [
  {
    key: 'block',
    width: 25,
  },
  {
    key: 'shard',
    width: 15,
  },
  {
    key: 'hash',
    width: 10,
    align: 'right',
  },
  {
    key: 'txs',
    width: 25,
    align: 'right',
  },
  {
    key: 'time',
    width: 25,
    align: 'right',
  },
];
