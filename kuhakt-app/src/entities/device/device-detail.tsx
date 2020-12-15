import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './device.reducer';
import { IDevice } from 'app/shared/model/device.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDeviceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DeviceDetail = (props: IDeviceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { deviceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Device [<b>{deviceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="deviceId">Device Id</span>
          </dt>
          <dd>{deviceEntity.deviceId}</dd>
          <dt>
            <span id="deviceExtId">Device Ext Id</span>
          </dt>
          <dd>{deviceEntity.deviceExtId}</dd>
          <dt>
            <span id="deviceName">Device Name</span>
          </dt>
          <dd>{deviceEntity.deviceName}</dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{deviceEntity.status}</dd>
          <dt>
            <span id="validUpto">Valid Upto</span>
          </dt>
          <dd>{deviceEntity.validUpto ? <TextFormat value={deviceEntity.validUpto} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="activatedOn">Activated On</span>
          </dt>
          <dd>{deviceEntity.activatedOn ? <TextFormat value={deviceEntity.activatedOn} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="createdAt">Created At</span>
          </dt>
          <dd>{deviceEntity.createdAt ? <TextFormat value={deviceEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="updatedAt">Updated At</span>
          </dt>
          <dd>{deviceEntity.updatedAt ? <TextFormat value={deviceEntity.updatedAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>User</dt>
          <dd>{deviceEntity.user ? deviceEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/device" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/device/${deviceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ device }: IRootState) => ({
  deviceEntity: device.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DeviceDetail);
