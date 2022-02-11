import React from 'react';
import classnames from 'classnames';
import dynamic from 'next/dynamic';
import {
  usePagination,
  useScreenSize,
} from '@hooks';
import { Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import {
  Pagination,
  NoData,
  Box,
  Loading,
} from '@components';
import { useStyles } from './styles';
import {
  useBlocks, PAGE_SIZE,
} from './hooks';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const Nodes: React.FC<ComponentDefault> = (props) => {
  const { t } = useTranslation('validators');
  const { isDesktop } = useScreenSize();
  const classes = useStyles();
  const {
    state, handlePageChangeCallback,
  } = useBlocks();
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
    component = <NoData />;
  } else if (isDesktop) {
    component = <Desktop items={state.items} />;
  } else {
    component = <Mobile items={state.items} />;
  }

  return (
    <Box className={classnames(props.className, classes.root)}>
      <Typography variant="h2">{t('nodes')}</Typography>
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

export default Nodes;
