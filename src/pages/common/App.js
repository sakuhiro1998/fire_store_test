import React from 'react';
import {Switch, Route} from 'react-router';
import Login from "../login/login.js";

const App = () => {
  return (
      <React.Fragment>
          <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/home" component={Login} />
          </Switch>
      </React.Fragment>
  )
};

export default App;
