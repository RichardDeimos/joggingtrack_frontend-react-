import React, { Component } from 'react';
import HeaderPage from '../components/header';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import PrivateRoute from './privateRoute';
import LoginPage from '../components/loginPage';
import RegisterPage from '../components/registerPage';
import DashboardPage from '../components/dashboardPage';
import { checkLocalStorage } from '../utils/localStorage';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <HeaderPage />
          <Switch>
            <Route path='/' exact={true} 
                render={props=> checkLocalStorage() ?
                        <Redirect to ='/dashboard'/>: 
                        <Redirect to ='/login'/>}/>
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <PrivateRoute path='/dashboard' component={DashboardPage}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;