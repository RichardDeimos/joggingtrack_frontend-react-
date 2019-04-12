import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from "react-router-dom";
import { getUserDataAction, logOut } from '../actions/authenticationActions';
import { compose } from 'redux'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },  
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  link: {
    marginTop: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 2,
    color: 'white',
    textDecoration: 'none',
  }
})  ;

class Header extends Component {
  
  componentDidMount(){
    const { me, getUserDataAction} = this.props; 
    if( me )
      getUserDataAction();
  }

  isAdminOrManager(){
    return this.props.role === 'admin' || this.props.role === 'manager'
  }

  logout = (e)=>{
    e.preventDefault()
    this.props.logOut();    
    this.props.history.push('/');
  }

  render(){
    const { classes, me } = this.props;
    
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Jogging-tracker
            </Typography>
            { !me && ( <Link className={classes.link} to="register">SIGN UP</Link> )}
            { !me && ( <Link className={classes.link} to="login">SIGN IN</Link> )}
            { this.isAdminOrManager() && ( <Link className={classes.link} to="login">USERS</Link> )}
            { me && ( <Link className={classes.link} to="dashboard">RECORD</Link> )}
            { me && ( <Link className={classes.link} to="login">REPORT</Link> )}
            { me && ( <a href='/' className={classes.link} onClick={this.logout}>LOGOUT</a> ) }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  me: state.auth.me,
  role: state.auth.role
});

const mapDispatchToProps = {
   getUserDataAction,
   logOut,
}

const connects = connect(mapStateToProps, mapDispatchToProps);
const withStyle = withStyles(styles);

export default compose( 
  connects,
  withStyle,
  withRouter
)(Header);