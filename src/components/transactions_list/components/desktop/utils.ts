export const columns:{
  key: string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  width: number;
}[] = [
  {
    key: 'hash',
    width: 25,
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
    width: 10,
  },
  {
    key: 'time',
    width: 10,
    align: 'right',
  },
];
