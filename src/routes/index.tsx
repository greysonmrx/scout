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
import CreateComparison from '../pages/CreateComparison';

import Reports from '../pages/Reports';
import CreateReport from '../pages/CreateReport';
import EditReport from '../pages/EditReport';
import CreateList from '../pages/CreateList';
import Lists from '../pages/Lists';
import EditList from '../pages/EditList';
import ListDetails from '../pages/ListDetails';
import Tasks from '../pages/Tasks';
import CreateTask from '../pages/CreateTask';
import EditTask from '../pages/EditTask';

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

    <Route path="/comparison" exact component={CreateComparison} isPrivate />
    <Route path="/comparison/:firstPlayer/:secondPlayer" exact component={Comparison} isPrivate />

    <Route path="/reports" exact component={Reports} isPrivate />
    <Route path="/reports/create" exact component={CreateReport} isPrivate />
    <Route path="/reports/edit/:id" exact component={EditReport} isPrivate />

    <Route path="/lists" exact component={Lists} isPrivate />
    <Route path="/lists/create" exact component={CreateList} isPrivate />
    <Route path="/lists/edit/:id" exact component={EditList} isPrivate />
    <Route path="/lists/details/:id" exact component={ListDetails} isPrivate />

    <Route path="/tasks" exact component={Tasks} isPrivate />
    <Route path="/tasks/create" exact component={CreateTask} isPrivate />
    <Route path="/tasks/edit/:id" exact component={EditTask} isPrivate />
  </Switch>
);

export default Routes;
