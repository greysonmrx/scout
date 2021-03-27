import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import Players from '../pages/Players';
import CreatePlayer from '../pages/CreatePlayer';
import PlayerDetails from '../pages/PlayerDetails';
import EditPlayer from '../pages/EditPlayer';

import Clubs from '../pages/Clubs';
import CreateClub from '../pages/CreateClub';
import EditClub from '../pages/EditClub';

import Positions from '../pages/Positions';
import CreatePosition from '../pages/CreatePosition';
import EditPosition from '../pages/EditPosition';

import Comparison from '../pages/Comparison';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/players" exact component={Players} isPrivate />
    <Route path="/players/create" exact component={CreatePlayer} isPrivate />
    <Route path="/players/details/:id" exact component={PlayerDetails} isPrivate />
    <Route path="/players/edit/:id" exact component={EditPlayer} isPrivate />

    <Route path="/clubs" exact component={Clubs} isPrivate />
    <Route path="/clubs/create" exact component={CreateClub} isPrivate />
    <Route path="/clubs/edit/:id" exact component={EditClub} isPrivate />

    <Route path="/positions" exact component={Positions} isPrivate />
    <Route path="/positions/create" exact component={CreatePosition} isPrivate />
    <Route path="/positions/edit/:id" exact component={EditPosition} isPrivate />

    <Route path="/comparison" exact component={Comparison} isPrivate />
  </Switch>
);

export default Routes;
