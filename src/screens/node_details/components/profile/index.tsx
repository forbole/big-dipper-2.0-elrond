import React from 'react';
import classname from 'classnames';
import { Typography } from '@material-ui/core';
import {
  Box,
} from '@components';
import { useStyles } from './styles';
import { ProfileType } from '../../types';

const Profile: React.FC<{profile: ProfileType } & ComponentDefault> = (props) => {
  const classes = useStyles();
  return (
    <Box className={classname(props.className, classes.root)}>
      <Typography variant="h2" className="name">
        {props.profile.name}
      </Typography>
      <Typography className="version">
        (
        {props.profile.version}
        )
      </Typography>
    </Box>
  );
};

export default Profile;
