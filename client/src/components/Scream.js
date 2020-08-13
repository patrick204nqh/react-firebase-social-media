import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

// MUI Stuff
import {
  Typography,
  CardMedia,
  Card,
  CardContent,
} from '@material-ui/core';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
}

class Scream extends Component {
  render() {
    const {
      classes,
      scream: { body, createAt, userImage, userHandle, screamId, likeCount, commentCount }
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {createAt}
          </Typography>
          <Typography variant="body1">
            {body}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(Scream);
