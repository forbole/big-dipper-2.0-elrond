import React from 'react';
import classnames from 'classnames';
import {
  Box,
  LoadAndExist,
} from '@components';
import { Validators } from './components';
import { useStyles } from './styles';
import { useValidators } from './hooks';

const List: React.FC<{
  className?: string;
}> = ({ className }) => {
  const classes = useStyles();
  const {
    state,
    // handleTabChange,
    // handleSearch,
  } = useValidators();

  return (
    <LoadAndExist
      loading={state.loading}
      exists={state.exists}
    >
      <Box className={classnames(className, classes.root)}>
        <Validators
          className={classes.list}
          search={state.search}
          items={state.validators}
        />
      </Box>
    </LoadAndExist>
  );
};

export default List;
