import React from 'react';
import classnames from 'classnames';
import dynamic from 'next/dynamic';
import {
  Box,
  LoadAndExist,
  TabPanel,
} from '@components';
import { Tabs } from './components';
import { useStyles } from './styles';
import { useValidators } from './hooks';
import { TabType } from './types';

const Validators = dynamic(() => import('./components/validators'));
const Providers = dynamic(() => import('./components/providers'));

const List: React.FC<{
  className?: string;
}> = ({ className }) => {
  const classes = useStyles();
  const {
    state,
    handleTabChange,
    handleSearch,
  } = useValidators();

  const tabs:TabType[] = [
    {
      id: 0,
      key: 'validators',
      component: (
        <Validators
          search={state.search}
          items={state.validators}
        />
      ),
    },
    {
      id: 1,
      key: 'providers',
      component: (
        <Providers
          search={state.search}
          items={state.providers}
        />
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
      </Box>
    </LoadAndExist>
  );
};

export default List;
