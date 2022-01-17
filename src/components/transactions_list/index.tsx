import React from 'react';
import dynamic from 'next/dynamic';
import { useScreenSize } from '@hooks';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const TransactionsList: React.FC<{items: TransactionType[] } & ComponentDefault> = (props) => {
  const { isDesktop } = useScreenSize();
  return (
    <>
      {isDesktop ? (
        <Desktop items={props.items} />
      ) : (
        <Mobile items={props.items} />
      )}
    </>
  );
};

export default TransactionsList;
