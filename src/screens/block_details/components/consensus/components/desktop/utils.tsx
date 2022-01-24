import numeral from 'numeral';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { ConsensusType } from '../../../../types';

export const columns:{
  key: string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  width: number;
}[] = [
  {
    key: 'idx',
    width: 5,
  },
  {
    key: 'validator',
    width: 95,
  },
];

export const formatRows = (data: ConsensusType[]) => {
  return data.map((x, i) => {
    return (
      {
        idx: numeral(i + 1).format('0,0'),
        validator: getMiddleEllipsis(x, {
          beginning: 40, ending: 30,
        }),
      }
    );
  });
};
