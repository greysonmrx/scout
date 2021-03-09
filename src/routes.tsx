import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Players from './pages/Players';
import Clubs from './pages/Clubs';
import Positions from './pages/Positions';
import PlayerDetails from './pages/PlayerDetails';
import Comparison from './pages/Comparison';
import CreatePlayer from './pages/CreatePlayer';
import EditPlayer from './pages/EditPlayer';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/players" exact component={Players} />
    <Route path="/players/create" exact component={CreatePlayer} />
    <Route path="/players/details/:id" exact component={PlayerDetails} />
    <Route path="/players/edit/:id" exact component={EditPlayer} />

    <Route path="/clubs" exact component={Clubs} />

    <Route path="/positions" exact component={Positions} />

    <Route path="/comparison" exact component={Comparison} />

    <Route component={() => <Redirect to="/players" />} />
  </Switch>
);

export default Routes;
