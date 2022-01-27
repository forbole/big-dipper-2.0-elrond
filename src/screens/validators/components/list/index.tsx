import React from 'react';
import classnames from 'classnames';
import dynamic from 'next/dynamic';
import {
  Box,
  NoData,
  LoadAndExist,
} from '@components';
import { useScreenSize } from '@hooks';
import { Tabs } from './components';
import { useStyles } from './styles';
import { useValidators } from './hooks';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const List: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { isDesktop } = useScreenSize();
  const classes = useStyles();
  const {
    state,
    handleTabChange,
    handleSearch,
    handleSort,
    sortItems,
  } = useValidators();

  const items = sortItems(state.items);

  return (
    <LoadAndExist
      loading={state.loading}
      exists={state.exists}
    >
      <Box className={classnames(className)}>
        <Tabs
          tab={state.tab}
          handleTabChange={handleTabChange}
          handleSearch={handleSearch}
        />
        <div className={classes.list}>
          {items.length ? (
            <>
              {isDesktop ? (
                // <Desktop
                //   className={classes.desktop}
                //   sortDirection={state.sortDirection}
                //   sortKey={state.sortKey}
                //   handleSort={handleSort}
                //   items={items}
                // />
                <Mobile
                  className={classes.mobile}
                  items={items}
                />
              ) : (
                <Mobile
                  className={classes.mobile}
                  items={items}
                />
              )}
            </>
          ) : (
            <NoData />
          )}
        </div>
      </Box>
    </LoadAndExist>
  );
};

export default List;
