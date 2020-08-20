import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import PostScream from '../components/PostScream';

// MUI stuff
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
// Icons
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <>
              <PostScream />
              <Link to='/'>
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <MyButton tip="Notifications">
                <Notifications />
              </MyButton>
            </>
          ) : (<></>)}
        </Toolbar>
      </AppBar >
    )
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)
