import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { ConsensusType } from '../../../../types';

export const columns:{
  key: string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  width: number;
}[] = [
  {
    key: 'validator',
    width: 100,
  },
];

export const formatRows = (data: ConsensusType[]) => {
  return data.map((x) => {
    return (
      {
        validator: getMiddleEllipsis(x, {
          beginning: 40, ending: 30,
        }),
      }
    );
  });
};
