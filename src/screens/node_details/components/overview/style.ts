import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return ({
        title: {
          marginBottom: theme.spacing(2),
        },
        body: {
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gridGap: theme.spacing(2),
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: 'repeat(4, 1fr)',
          },
        },
        item: {
          overflow: 'hidden',
          '& .item__key': {
            color: theme.palette.custom.fonts.fontThree,
          },
        },
        hash: {
          display: 'flex',
        },
        bullet: {
          width: '3px',
          borderRadius: '20%',
          background: theme.palette.custom.primaryData.two,
          marginRight: theme.spacing(1),
        },
      });
    },
  )();

  return styles;
};
