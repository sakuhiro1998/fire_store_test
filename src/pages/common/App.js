import React from 'react';
import {Switch, Route} from 'react-router';
import Login from '../login/login';
import Main from './main'

const App = () => {
  return (
      <React.Fragment>
          <Switch>
              <Route exact path='/' component={Login} />
              <Route path='*' component={Main} />
          </Switch>
      </React.Fragment>
  )
};

export default App;
