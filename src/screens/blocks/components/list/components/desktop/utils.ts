export const columns:{
  key: string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  width: number;
}[] = [
  {
    key: 'block',
    width: 15,
  },
  {
    key: 'shard',
    width: 10,
  },
  {
    key: 'hash',
    width: 35,
  },
  {
    key: 'txs',
    width: 25,
    align: 'right',
  },
  {
    key: 'time',
    width: 15,
    align: 'right',
  },
];
