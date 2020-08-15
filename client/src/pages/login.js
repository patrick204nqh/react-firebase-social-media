import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropsTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import axios from 'axios';

// MUI Stuff
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
  ...theme
})

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: {}
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post('/login', userData)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        this.setState({
          loading: false
        });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
          loading: false
        })
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm >
          <img src={AppIcon} alt="icon" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disable={loading}
            >
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>don't have an account ? sign up <Link to="/signup">here</Link></small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    )
  }
}

Login.propTypes = {
  classes: PropsTypes.object.isRequired
}

export default withStyles(styles)(Login);
