import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUserAction } from '../actions/authenticationActions';

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
    let isSuccess;

    if (this.props.response.register.response) {
      isSuccess = this.props.response.register.response.error ? false : true; 
    }

    return (
      <div>
        <h3>RegisterPage</h3>
        {isSuccess && <Redirect to='login' />}
        <form onSubmit={this.onHandleRegistration}>
          <div>
            <label>FirstName</label>
            <input type="text" name="first_name" />
          </div>
          <div>
            <label>LastName</label>
            <input type="text" name="last_name" />
          </div>
          <div>
            <label>Name</label>
            <input type="text" name="username" />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" />
          </div>
          <div>
            <button>Register</button>
          </div>
        </form>
        Already have account? <Link to='login'>Login here</Link>
      </div>
    )
  }
}

const mapStateToProps = (response) => ({
  response
});

export default connect(mapStateToProps)(RegisterPage);
