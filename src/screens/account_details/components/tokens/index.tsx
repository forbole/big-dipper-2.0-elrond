import React from 'react';
import classnames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import { usePagination } from '@hooks';
import {
  Pagination,
  Box,
  Loading,
} from '@components';
import { Typography } from '@material-ui/core';
import { useStyles } from './styles';
import { List } from './components';
import {
  useTokens, PAGE_SIZE,
} from './hooks';

const Tokens:React.FC<ComponentDefault> = (props) => {
  const { t } = useTranslation('accounts');
  const classes = useStyles();
  const {
    state, handlePageChangeCallback,
  } = useTokens();
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination({
    rowsPage: PAGE_SIZE,
    pageChangeCallback: handlePageChangeCallback,
  });

  let component = null;

  if (state.loading) {
    component = <Loading />;
  } else if (!state.items.length) {
    return null;
  } else {
    component = <List items={state.items} />;
  }

  return (
    <Box className={classnames(props.className, classes.root)}>
      <Typography variant="h2">{t('tokens')}</Typography>
      {component}
      <Pagination
        className={classes.paginate}
        total={state.total}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default Tokens;
