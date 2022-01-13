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

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const List = () => {
  const classes = useStyles();
  const { isDesktop } = useScreenSize();
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    sliceItems,
  } = usePagination({
    rowsPage: 25,
  });

  return (
    <Box>
      <>
        {isDesktop ? (
          <Desktop className={classes.desktop} />
        ) : (
          <Mobile className={classes.mobile} />
        )}
      </>
      <Pagination
        className={classes.paginate}
        total={100}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default List;
