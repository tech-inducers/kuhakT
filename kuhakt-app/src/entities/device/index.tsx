import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Device from './device';
import DeviceDetail from './device-detail';
import DeviceUpdate from './device-update';
import DeviceDeleteDialog from './device-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DeviceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DeviceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DeviceDetail} />
      <ErrorBoundaryRoute path={match.url} component={Device} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DeviceDeleteDialog} />
  </>
);

export default Routes;
