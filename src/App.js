
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/login/Login';
// import PageNotFound from './pages/pageNotFound/PageNotFound';
import MainContainer from './view/layout/mainContainer/MainContainer';
import ExternalDashboard from './pages/externalDashboard/ExternalDashboard';
import ForgotPassword from './pages/forgotPassword/forgotPassword';
import PasswordRecovery from './pages/recoverPassword/PasswordRecovery';
// import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';

class App extends Component {
  render() {
    return (
      <Router basename="/truehomereview_web" >
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route path='/recover-password/:email/:activationKey' component={PasswordRecovery} />
          <Route path='/forgot-password' component={ForgotPassword} />
          {/* <Route path='/external-dashboard' component={ExternalDashboard} /> */}
          <Route path='/main' component={MainContainer} />
          <Route exact={true} path="/" render={(props) => {
            let user = JSON.parse(localStorage.getItem("user"))
            if (user && user.token) {
              return <Redirect from="/" to="/main/dashboard" />
            } else {
              return <Redirect from="/" to="/login" />
            }
          }} />
          <Route path="/404" render={() => <h1>Page not found</h1>} />
          <Route path="*" render={() => <h1>Page not found</h1>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
