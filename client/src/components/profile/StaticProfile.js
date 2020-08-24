import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI
import { Paper, Typography } from '@material-ui/core'
import MuiLink from '@material-ui/core/Link';
// Icons
import { LocationOn, CalendarToday } from '@material-ui/icons';
import LinkIcon from '@material-ui/icons/Link';
// import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
  ...theme.myCustom
});

const StaticProfile = (props) => {
  const {
    classes,
    profile: {
      handle,
      createdAt,
      imageUrl,
      bio,
      website,
      location
    }
  } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/user/${handle}`}
            color="primary"
            variant="h5"
          >
            @{handle}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr />
            </>
          )}
          {website && (
            <>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer ">
                {' '}{website}
              </a>
              <hr />
            </>
          )}
          <CalendarToday color="primary" />{' '}
          <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
        </div>
      </div>
    </Paper>
  )
}

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(StaticProfile);
