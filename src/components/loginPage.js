import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUserAction } from '../actions/authenticationActions';
import { setCookie } from '../utils/cookies';

class LoginPage extends Component {
  onHandleLogin = (event) => {
    event.preventDefault();

    let username = event.target.username.value;
    let password = event.target.password.value;

    const data = {
      username, password
    };

    this.props.dispatch(loginUserAction(data));
  }

  render() {
    let isSuccess;

    if (this.props.response.login.response) {

      isSuccess = this.props.response.login.response.error ? false : true;
    }
    //If you want to save your jwt token to the cookie then follow code
    if (isSuccess) {
        setCookie('token', this.props.response.login.response.data.token, 1);
    }
    
    return (
      <div>
        <h3>Login Page</h3>
        {isSuccess && <Redirect to='dashboard' />}
        <form onSubmit={this.onHandleLogin}>
          <div>
            <label>Username</label>
            <input type="username" name="username" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" />
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>
        Don't have account? <Link to='register'>Register here</Link>
      </div>
    );
  }
}

const mapStateToProps = (response) => ({response});

export default connect(mapStateToProps)(LoginPage);
