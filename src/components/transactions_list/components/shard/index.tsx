import React from 'react';
import { ArrowForward } from '@material-ui/icons';
import { useStyles } from './styles';

const Shard: React.FC<{to: number, from: number} & ComponentDefault> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {props.from}
      <ArrowForward className={classes.icon} />
      {props.to}
    </div>
  );
};

export default Shard;
