import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PlatformProvider from './platform-provider';
import PlatformUser from './platform-user';
import Device from './device';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}platform-provider`} component={PlatformProvider} />
      <ErrorBoundaryRoute path={`${match.url}platform-user`} component={PlatformUser} />
      <ErrorBoundaryRoute path={`${match.url}device`} component={Device} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
