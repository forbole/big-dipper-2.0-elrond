import React from 'react';
import classnames from 'classnames';
import dynamic from 'next/dynamic';
import {
  Box,
  NoData,
  LoadAndExist,
  TabPanel,
} from '@components';
import { useScreenSize } from '@hooks';
import { Tabs } from './components';
import { useStyles } from './styles';
import { useValidators } from './hooks';
import { TabType } from './types';

// const Desktop = dynamic(() => import('./components/desktop'));
// const Mobile = dynamic(() => import('./components/mobile'));
const Validators = dynamic(() => import('./components/validators'));
const Providers = dynamic(() => import('./components/providers'));

const List: React.FC<{
  className?: string;
}> = ({ className }) => {
  // const { isDesktop } = useScreenSize();
  const classes = useStyles();
  const {
    state,
    handleTabChange,
    handleSearch,
    handleSort,
    sortItems,
  } = useValidators();

  const mergedDataWithProfiles = state.items.map((x) => {
    return ({
      ...x,
      validator: {
        imageUrl: x.imageUrl,
        address: x.identity,
        name: x.validator,
      },
    });
  });

  const items = sortItems(mergedDataWithProfiles);

  const tabs:TabType[] = [
    {
      id: 0,
      key: 'validators',
      component: (
        <Validators />
      ),
    },
    {
      id: 1,
      key: 'providers',
      component: (
        <Providers />
      ),
    },
  ];

  return (
    <LoadAndExist
      loading={state.loading}
      exists={state.exists}
    >
      <Box className={classnames(className, classes.root)}>
        <Tabs
          tabs={tabs}
          tab={state.tab}
          handleTabChange={handleTabChange}
          handleSearch={handleSearch}
        />
        {tabs.map((x) => {
          return (
            <TabPanel
              key={x.id}
              index={x.id}
              value={state.tab}
            >
              <div className={classes.list}>
                {x.component}
              </div>
            </TabPanel>
          );
        })}
        {/* <div className={classes.list}>
          {items.length ? (
            <>
              {isDesktop ? (
                <Desktop
                  sortDirection={state.sortDirection}
                  sortKey={state.sortKey}
                  handleSort={handleSort}
                  items={items}
                />
              ) : (
                <Mobile
                  items={items}
                />
              )}
            </>
          ) : (
            <NoData />
          )}
        </div> */}
      </Box>
    </LoadAndExist>
  );
};

export default List;
