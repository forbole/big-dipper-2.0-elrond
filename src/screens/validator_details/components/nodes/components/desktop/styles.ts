import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return ({
        root: {
          '& .eligible': {
            color: theme.palette.custom.primaryData.four,
          },
        },
      });
    },
  )();

  return styles;
};
