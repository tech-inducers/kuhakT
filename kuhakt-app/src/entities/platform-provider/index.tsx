import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PlatformProvider from './platform-provider';
import PlatformProviderDetail from './platform-provider-detail';
import PlatformProviderUpdate from './platform-provider-update';
import PlatformProviderDeleteDialog from './platform-provider-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PlatformProviderUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PlatformProviderUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PlatformProviderDetail} />
      <ErrorBoundaryRoute path={match.url} component={PlatformProvider} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PlatformProviderDeleteDialog} />
  </>
);

export default Routes;
