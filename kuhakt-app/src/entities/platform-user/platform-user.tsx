import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './platform-user.reducer';
import { IPlatformUser } from 'app/shared/model/platform-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlatformUserProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PlatformUser = (props: IPlatformUserProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { platformUserList, match, loading } = props;
  return (
    <div>
      <h2 id="platform-user-heading">
        Platform Users
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Platform User
        </Link>
      </h2>
      <div className="table-responsive">
        {platformUserList && platformUserList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>User Id</th>
                <th>User Ext Id</th>
                <th>User Name</th>
                <th>Status</th>
                <th>Valid Upto</th>
                <th>Activated On</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Provider</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {platformUserList.map((platformUser, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${platformUser.id}`} color="link" size="sm">
                      {platformUser.id}
                    </Button>
                  </td>
                  <td>{platformUser.userId}</td>
                  <td>{platformUser.userExtId}</td>
                  <td>{platformUser.userName}</td>
                  <td>{platformUser.status}</td>
                  <td>
                    {platformUser.validUpto ? <TextFormat type="date" value={platformUser.validUpto} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {platformUser.activatedOn ? <TextFormat type="date" value={platformUser.activatedOn} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {platformUser.createdAt ? <TextFormat type="date" value={platformUser.createdAt} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {platformUser.updatedAt ? <TextFormat type="date" value={platformUser.updatedAt} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {platformUser.provider ? (
                      <Link to={`platform-provider/${platformUser.provider.id}`}>{platformUser.provider.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${platformUser.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${platformUser.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${platformUser.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Platform Users found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ platformUser }: IRootState) => ({
  platformUserList: platformUser.entities,
  loading: platformUser.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlatformUser);
