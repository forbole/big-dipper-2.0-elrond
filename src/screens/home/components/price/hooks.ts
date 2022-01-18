import { useState } from 'react';
import numeral from 'numeral';
import { PriceState } from './types';

const fakeData = [{
  time: '2022-01-12T00:00:00.000Z',
  value: 215.02,
},
{
  time: '2022-01-13T00:00:00.000Z',
  value: 195.1,
},
{
  time: '2022-01-14T00:00:00.000Z',
  value: 199.53,
},
{
  time: '2022-01-15T00:00:00.000Z',
  value: 200.7,
},
{
  time: '2022-01-16T00:00:00.000Z',
  value: 195.38,
},
{
  time: '2022-01-17T00:00:00.000Z',
  value: 187.26,
},
{
  time: '2022-01-18T00:00:00.000Z',
  value: 184.87,
}];

export const usePrice = () => {
  const [state, _setState] = useState<PriceState>({
    items: fakeData,
  });

  const tickPriceFormatter = (num: number) => {
    return `$${numeral(num).format('0,0')}`;
  };

  return {
    state,
    tickPriceFormatter,
  };
};
