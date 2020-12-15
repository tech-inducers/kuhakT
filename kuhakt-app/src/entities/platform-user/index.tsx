import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PlatformUser from './platform-user';
import PlatformUserDetail from './platform-user-detail';
import PlatformUserUpdate from './platform-user-update';
import PlatformUserDeleteDialog from './platform-user-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PlatformUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PlatformUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PlatformUserDetail} />
      <ErrorBoundaryRoute path={match.url} component={PlatformUser} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PlatformUserDeleteDialog} />
  </>
);

export default Routes;
