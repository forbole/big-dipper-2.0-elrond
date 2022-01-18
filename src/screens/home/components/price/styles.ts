import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return ({
        root: {

        },
        label: {
          marginBottom: theme.spacing(2),
        },
        chart: {
          height: '290px',
          width: '100%',
        },
      });
    },
  )();

  return styles;
};
