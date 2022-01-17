import React from 'react';
import numeral from 'numeral';
import dayjs from '@utils/dayjs';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { Divider } from '@material-ui/core';
import { SingleBlockMobile } from '@components';
import { BlockType } from '../../types';

const Mobile: React.FC<{items: BlockType[]} & ComponentDefault> = (props) => {
  const formattedItems = props.items.map((x) => {
    return ({
      block: numeral(x.block).format('0,0'),
      shard: x.shard,
      hash: getMiddleEllipsis(x.hash, {
        beginning: 13, ending: 15,
      }),
      txs: numeral(x.txs).format('0,0'),
      time: dayjs.utc(x.timestamp).fromNow(),
    });
  });
  return (
    <div className={props.className}>
      {formattedItems.map((x, i) => {
        return (
          <React.Fragment key={`${x.block}-${i}`}>
            <SingleBlockMobile {...x} />
            {i !== formattedItems.length - 1 && <Divider />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Mobile;
