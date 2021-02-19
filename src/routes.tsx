import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Players from './pages/Players';
import Clubs from './pages/Clubs';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Players} />
    <Route path="/clubs" exact component={Clubs} />

    <Route component={() => <Redirect to="/" />} />
  </Switch>
);

export default Routes;
