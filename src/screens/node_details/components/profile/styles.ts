import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return ({
        root: {
          display: 'flex',
          flexDirection: 'column',
          [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            '& .name': {
              lineHeight: 1,
              marginRight: theme.spacing(2),
            },
            '& .version': {
              color: theme.palette.custom.fonts.fontThree,
            },
          },
        },
      });
    },
  )();

  return styles;
};
