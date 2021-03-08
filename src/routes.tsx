import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Players from './pages/Players';
import Clubs from './pages/Clubs';
import Positions from './pages/Positions';
import PlayerDetails from './pages/PlayerDetails';
import Comparison from './pages/Comparison';
import CreatePlayer from './pages/CreatePlayer';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/players" exact component={Players} />
    <Route path="/clubs" exact component={Clubs} />
    <Route path="/positions" exact component={Positions} />
    <Route path="/players/details/:id" exact component={PlayerDetails} />
    <Route path="/comparison" exact component={Comparison} />
    <Route path="/players/create" exact component={CreatePlayer} />

    <Route component={() => <Redirect to="/players" />} />
  </Switch>
);

export default Routes;
