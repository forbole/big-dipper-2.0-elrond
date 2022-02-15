import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    () => {
      return ({
        root: {
          overflow: 'auto',
          width: '100%',
          '& .MuiTableCell-root': {
            whiteSpace: 'nowrap',
          },
        },
      });
    },
  )();

  return styles;
};
