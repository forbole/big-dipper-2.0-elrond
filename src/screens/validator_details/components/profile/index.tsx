import React from 'react';
import classnames from 'classnames';
import {
  Typography,
  // Divider,
} from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import {
  Box,
  Avatar,
  Markdown,
} from '@components';
import { useStyles } from './styles';
import { ProfileType } from '../../types';

const Profile: React.FC<{profile: ProfileType} & ComponentDefault> = ({
  className, profile,
}) => {
  const classes = useStyles();
  // const { t } = useTranslation('validators');

  return (
    <Box className={classnames(className)}>
      <div className={classes.bio}>
        <Avatar
          address={profile.name}
          imageUrl={profile.imageUrl}
          className={classnames(classes.avatar, classes.desktopAvatar)}
        />
        <div>
          <div className="bio__header">
            {/* ======================== */}
            {/* mobile header */}
            {/* ======================== */}
            <div className={classes.header}>
              <Avatar
                address={profile.name}
                imageUrl={profile.imageUrl}
                className={classnames(classes.avatar, classes.mobile)}
              />
              <div className="header__content">
                <Typography variant="h2">
                  {profile.name}
                </Typography>
              </div>
            </div>
          </div>
          {/* ======================== */}
          {/* bio */}
          {/* ======================== */}
          {profile.description && (
            <div className="bio__content">
              <Markdown markdown={profile.description} />
            </div>
          )}
        </div>
      </div>

      {/* <Divider className={classes.divider} />
      <div>
        <div className={classes.item}>
          <Typography variant="h4" className="label">
            {t('website')}
          </Typography>
          {formattedItem.website}
        </div>
      </div> */}
    </Box>
  );
};

export default Profile;
