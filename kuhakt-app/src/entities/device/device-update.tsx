import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPlatformUser } from 'app/shared/model/platform-user.model';
import { getEntities as getPlatformUsers } from 'app/entities/platform-user/platform-user.reducer';
import { getEntity, updateEntity, createEntity, reset } from './device.reducer';
import { IDevice } from 'app/shared/model/device.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDeviceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DeviceUpdate = (props: IDeviceUpdateProps) => {
  const [userId, setUserId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { deviceEntity, platformUsers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/device');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPlatformUsers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.validUpto = convertDateTimeToServer(values.validUpto);
    values.activatedOn = convertDateTimeToServer(values.activatedOn);
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.updatedAt = convertDateTimeToServer(values.updatedAt);

    if (errors.length === 0) {
      const entity = {
        ...deviceEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="kuhakTIoTApp.device.home.createOrEditLabel">Create or edit a Device</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : deviceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="device-id">ID</Label>
                  <AvInput id="device-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="deviceIdLabel" for="device-deviceId">
                  Device Id
                </Label>
                <AvField id="device-deviceId" type="string" className="form-control" name="deviceId" />
              </AvGroup>
              <AvGroup>
                <Label id="deviceExtIdLabel" for="device-deviceExtId">
                  Device Ext Id
                </Label>
                <AvField id="device-deviceExtId" type="string" className="form-control" name="deviceExtId" />
              </AvGroup>
              <AvGroup>
                <Label id="deviceNameLabel" for="device-deviceName">
                  Device Name
                </Label>
                <AvField id="device-deviceName" type="text" name="deviceName" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="device-status">
                  Status
                </Label>
                <AvInput
                  id="device-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && deviceEntity.status) || 'NEW'}
                >
                  <option value="NEW">NEW</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="DEACTIVE">DEACTIVE</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="validUptoLabel" for="device-validUpto">
                  Valid Upto
                </Label>
                <AvInput
                  id="device-validUpto"
                  type="datetime-local"
                  className="form-control"
                  name="validUpto"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.deviceEntity.validUpto)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="activatedOnLabel" for="device-activatedOn">
                  Activated On
                </Label>
                <AvInput
                  id="device-activatedOn"
                  type="datetime-local"
                  className="form-control"
                  name="activatedOn"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.deviceEntity.activatedOn)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdAtLabel" for="device-createdAt">
                  Created At
                </Label>
                <AvInput
                  id="device-createdAt"
                  type="datetime-local"
                  className="form-control"
                  name="createdAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.deviceEntity.createdAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedAtLabel" for="device-updatedAt">
                  Updated At
                </Label>
                <AvInput
                  id="device-updatedAt"
                  type="datetime-local"
                  className="form-control"
                  name="updatedAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.deviceEntity.updatedAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="device-user">User</Label>
                <AvInput id="device-user" type="select" className="form-control" name="user.id">
                  <option value="" key="0" />
                  {platformUsers
                    ? platformUsers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/device" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  platformUsers: storeState.platformUser.entities,
  deviceEntity: storeState.device.entity,
  loading: storeState.device.loading,
  updating: storeState.device.updating,
  updateSuccess: storeState.device.updateSuccess,
});

const mapDispatchToProps = {
  getPlatformUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DeviceUpdate);
