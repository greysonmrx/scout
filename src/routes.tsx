import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Players from './pages/Players';
import CreatePlayer from './pages/CreatePlayer';
import PlayerDetails from './pages/PlayerDetails';
import EditPlayer from './pages/EditPlayer';

import Clubs from './pages/Clubs';
import CreateClub from './pages/CreateClub';
import EditClub from './pages/EditClub';

import Positions from './pages/Positions';
import CreatePosition from './pages/CreatePosition';
import EditPosition from './pages/EditPosition';

import Comparison from './pages/Comparison';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/players" exact component={Players} />
    <Route path="/players/create" exact component={CreatePlayer} />
    <Route path="/players/details/:id" exact component={PlayerDetails} />
    <Route path="/players/edit/:id" exact component={EditPlayer} />

    <Route path="/clubs" exact component={Clubs} />
    <Route path="/clubs/create" exact component={CreateClub} />
    <Route path="/clubs/edit/:id" exact component={EditClub} />

    <Route path="/positions" exact component={Positions} />
    <Route path="/positions/create" exact component={CreatePosition} />
    <Route path="/positions/edit/:id" exact component={EditPosition} />

    <Route path="/comparison" exact component={Comparison} />

    <Route component={() => <Redirect to="/players" />} />
  </Switch>
);

export default Routes;
