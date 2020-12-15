import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPlatformProvider } from 'app/shared/model/platform-provider.model';
import { getEntities as getPlatformProviders } from 'app/entities/platform-provider/platform-provider.reducer';
import { getEntity, updateEntity, createEntity, reset } from './platform-user.reducer';
import { IPlatformUser } from 'app/shared/model/platform-user.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPlatformUserUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlatformUserUpdate = (props: IPlatformUserUpdateProps) => {
  const [providerId, setProviderId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { platformUserEntity, platformProviders, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/platform-user');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPlatformProviders();
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
        ...platformUserEntity,
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
          <h2 id="kuhakTIoTApp.platformUser.home.createOrEditLabel">Create or edit a PlatformUser</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : platformUserEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="platform-user-id">ID</Label>
                  <AvInput id="platform-user-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="userIdLabel" for="platform-user-userId">
                  User Id
                </Label>
                <AvField id="platform-user-userId" type="string" className="form-control" name="userId" />
              </AvGroup>
              <AvGroup>
                <Label id="userExtIdLabel" for="platform-user-userExtId">
                  User Ext Id
                </Label>
                <AvField id="platform-user-userExtId" type="string" className="form-control" name="userExtId" />
              </AvGroup>
              <AvGroup>
                <Label id="userNameLabel" for="platform-user-userName">
                  User Name
                </Label>
                <AvField id="platform-user-userName" type="text" name="userName" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="platform-user-status">
                  Status
                </Label>
                <AvInput
                  id="platform-user-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && platformUserEntity.status) || 'NEW'}
                >
                  <option value="NEW">NEW</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="DEACTIVE">DEACTIVE</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="validUptoLabel" for="platform-user-validUpto">
                  Valid Upto
                </Label>
                <AvInput
                  id="platform-user-validUpto"
                  type="datetime-local"
                  className="form-control"
                  name="validUpto"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.platformUserEntity.validUpto)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="activatedOnLabel" for="platform-user-activatedOn">
                  Activated On
                </Label>
                <AvInput
                  id="platform-user-activatedOn"
                  type="datetime-local"
                  className="form-control"
                  name="activatedOn"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.platformUserEntity.activatedOn)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdAtLabel" for="platform-user-createdAt">
                  Created At
                </Label>
                <AvInput
                  id="platform-user-createdAt"
                  type="datetime-local"
                  className="form-control"
                  name="createdAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.platformUserEntity.createdAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedAtLabel" for="platform-user-updatedAt">
                  Updated At
                </Label>
                <AvInput
                  id="platform-user-updatedAt"
                  type="datetime-local"
                  className="form-control"
                  name="updatedAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.platformUserEntity.updatedAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="platform-user-provider">Provider</Label>
                <AvInput id="platform-user-provider" type="select" className="form-control" name="provider.id">
                  <option value="" key="0" />
                  {platformProviders
                    ? platformProviders.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/platform-user" replace color="info">
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
  platformProviders: storeState.platformProvider.entities,
  platformUserEntity: storeState.platformUser.entity,
  loading: storeState.platformUser.loading,
  updating: storeState.platformUser.updating,
  updateSuccess: storeState.platformUser.updateSuccess,
});

const mapDispatchToProps = {
  getPlatformProviders,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlatformUserUpdate);
