export const columns:{
  key: string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  width: number;
}[] = [
  {
    key: 'hash',
    width: 15,
  },
  {
    key: 'shard',
    width: 15,
  },
  {
    key: 'from',
    width: 20,
  },
  {
    key: 'to',
    width: 20,
  },
  {
    key: 'status',
    width: 15,
  },
  {
    key: 'time',
    width: 15,
    align: 'right',
  },
];
