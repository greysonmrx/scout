import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Players from './pages/Players';
import Clubs from './pages/Clubs';
import Positions from './pages/Positions';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Players} />
    <Route path="/clubs" exact component={Clubs} />
    <Route path="/positions" exact component={Positions} />

    <Route component={() => <Redirect to="/" />} />
  </Switch>
);

export default Routes;
