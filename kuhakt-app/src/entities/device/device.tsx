import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './device.reducer';
import { IDevice } from 'app/shared/model/device.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDeviceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Device = (props: IDeviceProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { deviceList, match, loading } = props;
  return (
    <div>
      <h2 id="device-heading">
        Devices
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Device
        </Link>
      </h2>
      <div className="table-responsive">
        {deviceList && deviceList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Device Id</th>
                <th>Device Ext Id</th>
                <th>Device Name</th>
                <th>Status</th>
                <th>Valid Upto</th>
                <th>Activated On</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>User</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {deviceList.map((device, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${device.id}`} color="link" size="sm">
                      {device.id}
                    </Button>
                  </td>
                  <td>{device.deviceId}</td>
                  <td>{device.deviceExtId}</td>
                  <td>{device.deviceName}</td>
                  <td>{device.status}</td>
                  <td>{device.validUpto ? <TextFormat type="date" value={device.validUpto} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{device.activatedOn ? <TextFormat type="date" value={device.activatedOn} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{device.createdAt ? <TextFormat type="date" value={device.createdAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{device.updatedAt ? <TextFormat type="date" value={device.updatedAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{device.user ? <Link to={`platform-user/${device.user.id}`}>{device.user.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${device.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${device.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${device.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Devices found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ device }: IRootState) => ({
  deviceList: device.entities,
  loading: device.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Device);
