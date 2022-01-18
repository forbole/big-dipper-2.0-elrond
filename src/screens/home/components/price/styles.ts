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
          '& .yAxis .recharts-cartesian-axis-tick:first-child': {
            display: 'none',
          },
        },
      });
    },
  )();

  return styles;
};
