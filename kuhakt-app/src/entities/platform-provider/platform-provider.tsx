import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './platform-provider.reducer';
import { IPlatformProvider } from 'app/shared/model/platform-provider.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlatformProviderProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PlatformProvider = (props: IPlatformProviderProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { platformProviderList, match, loading } = props;
  return (
    <div>
      <h2 id="platform-provider-heading">
        Platform Providers
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Platform Provider
        </Link>
      </h2>
      <div className="table-responsive">
        {platformProviderList && platformProviderList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Provider Id</th>
                <th>Provider Ext Id</th>
                <th>Provider Name</th>
                <th>Provider Status</th>
                <th>Valid Upto</th>
                <th>Activated On</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {platformProviderList.map((platformProvider, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${platformProvider.id}`} color="link" size="sm">
                      {platformProvider.id}
                    </Button>
                  </td>
                  <td>{platformProvider.providerId}</td>
                  <td>{platformProvider.providerExtId}</td>
                  <td>{platformProvider.providerName}</td>
                  <td>{platformProvider.providerStatus}</td>
                  <td>
                    {platformProvider.validUpto ? (
                      <TextFormat type="date" value={platformProvider.validUpto} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {platformProvider.activatedOn ? (
                      <TextFormat type="date" value={platformProvider.activatedOn} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {platformProvider.createdAt ? (
                      <TextFormat type="date" value={platformProvider.createdAt} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {platformProvider.updatedAt ? (
                      <TextFormat type="date" value={platformProvider.updatedAt} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${platformProvider.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${platformProvider.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${platformProvider.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Platform Providers found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ platformProvider }: IRootState) => ({
  platformProviderList: platformProvider.entities,
  loading: platformProvider.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlatformProvider);
