import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return ({
        root: {
          overflow: 'hidden',
        },
        title: {
          marginBottom: theme.spacing(2),
        },
        block: {
          wordWrap: 'break-word',
        },
        divider: {
          margin: theme.spacing(2, 0),
        },
        listContainer: {
          width: '100%',
          overflow: 'hidden',
          display: 'grid',
        },
      });
    },
  )();

  return styles;
};
