import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRouter,
  Redirect,
} from 'react-router-dom';

import DefaultLayout from '../layouts/Default';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}: RouteProps) => {
  const { user } = useAuth();

  return (
    <ReactDOMRouter
      {...rest}
      render={({ location }) => {
        if (isPrivate === !!user) {
          return isPrivate ? (
            <DefaultLayout>
              <Component {...rest}/>
            </DefaultLayout>
          ) : (
            <Component {...rest}/>
          );
        }

        return (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/players',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
