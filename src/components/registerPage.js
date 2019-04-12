import { connect } from 'react-redux';
import { registerUserAction } from '../actions/authenticationActions';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  link: {
    marginTop: theme.spacing.unit * 1,
  }
});

class RegisterPage extends Component {
 onHandleRegistration = (event) => {
    event.preventDefault();

    let username = event.target.username.value;
    let first_name = event.target.first_name.value;
    let last_name = event.target.last_name.value;
    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = {
      user: {
      first_name, last_name, username, email, password
      }
    };

    this.props.dispatch(registerUserAction(data));
  }

  render() {

   const { classes, response } = this.props;
   console.log(this.props)
   let isSuccess;
    if ( response.auth.success ) {
      isSuccess = true;
    }
    return (
      <main className={classes.main}> 
       {isSuccess && <Redirect to='login' />}
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={this.onHandleRegistration}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="first_name">FirstName</InputLabel>
              <Input id="first_name" name="first_name" autoComplete="first_name" autoFocus />
            </FormControl>
             <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="last_name">LastName</InputLabel>
              <Input id="last_name" name="last_name" autoComplete="last_name" autoFocus />
            </FormControl>
             <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">UserName</InputLabel>
              <Input id="username" name="username" autoComplete="username" autoFocus />
            </FormControl>
             <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input type="email" id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="password" />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign up
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (response) => ({response});

export default connect(mapStateToProps)(withStyles(styles)(RegisterPage));


