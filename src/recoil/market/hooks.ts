/* eslint-disable max-len */
import * as R from 'ramda';
import numeral from 'numeral';
import {
  useRecoilState,
  SetterOrUpdater,
} from 'recoil';
import Big from 'big.js';
import { chainConfig } from '@configs';
import {
  writeMarket,
} from '@recoil/market';
import { AtomState } from '@recoil/market/types';
import { getDenom } from '@utils/get_denom';
import { formatToken } from '@utils/format_token';

export const useMarketRecoil = () => {
  const [market, setMarket] = useRecoilState(writeMarket) as [AtomState, SetterOrUpdater<AtomState>];
};
