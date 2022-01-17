import React from 'react';
import dynamic from 'next/dynamic';
import {
  usePagination,
  useScreenSize,
} from '@hooks';
import {
  Pagination,
  NoData,
  Box,
} from '@components';
import { useStyles } from './styles';
import { useBlocks } from './hooks';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const List = () => {
  const classes = useStyles();
  const { isDesktop } = useScreenSize();
  const {
    state, handlePageChange,
  } = useBlocks();
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination({
    rowsPage: 25,
    pageChangeCallback: handlePageChange,
  });

  return (
    <Box>
      {!state.items.length ? (
        <NoData />
      ) : (
        <>
          {isDesktop ? (
            <Desktop items={state.items} />
          ) : (
            <Mobile items={state.items} />
          )}
        </>
      )}
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

export default List;
