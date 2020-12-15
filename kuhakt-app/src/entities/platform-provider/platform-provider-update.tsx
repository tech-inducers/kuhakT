import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './platform-provider.reducer';
import { IPlatformProvider } from 'app/shared/model/platform-provider.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPlatformProviderUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlatformProviderUpdate = (props: IPlatformProviderUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { platformProviderEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/platform-provider');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
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
        ...platformProviderEntity,
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
          <h2 id="kuhakTIoTApp.platformProvider.home.createOrEditLabel">Create or edit a PlatformProvider</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : platformProviderEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="platform-provider-id">ID</Label>
                  <AvInput id="platform-provider-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="providerIdLabel" for="platform-provider-providerId">
                  Provider Id
                </Label>
                <AvField id="platform-provider-providerId" type="string" className="form-control" name="providerId" />
              </AvGroup>
              <AvGroup>
                <Label id="providerExtIdLabel" for="platform-provider-providerExtId">
                  Provider Ext Id
                </Label>
                <AvField id="platform-provider-providerExtId" type="string" className="form-control" name="providerExtId" />
              </AvGroup>
              <AvGroup>
                <Label id="providerNameLabel" for="platform-provider-providerName">
                  Provider Name
                </Label>
                <AvField id="platform-provider-providerName" type="text" name="providerName" />
              </AvGroup>
              <AvGroup>
                <Label id="providerStatusLabel" for="platform-provider-providerStatus">
                  Provider Status
                </Label>
                <AvInput
                  id="platform-provider-providerStatus"
                  type="select"
                  className="form-control"
                  name="providerStatus"
                  value={(!isNew && platformProviderEntity.providerStatus) || 'NEW'}
                >
                  <option value="NEW">NEW</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="DEACTIVE">DEACTIVE</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="validUptoLabel" for="platform-provider-validUpto">
                  Valid Upto
                </Label>
                <AvInput
                  id="platform-provider-validUpto"
                  type="datetime-local"
                  className="form-control"
                  name="validUpto"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.platformProviderEntity.validUpto)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="activatedOnLabel" for="platform-provider-activatedOn">
                  Activated On
                </Label>
                <AvInput
                  id="platform-provider-activatedOn"
                  type="datetime-local"
                  className="form-control"
                  name="activatedOn"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.platformProviderEntity.activatedOn)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdAtLabel" for="platform-provider-createdAt">
                  Created At
                </Label>
                <AvInput
                  id="platform-provider-createdAt"
                  type="datetime-local"
                  className="form-control"
                  name="createdAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.platformProviderEntity.createdAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedAtLabel" for="platform-provider-updatedAt">
                  Updated At
                </Label>
                <AvInput
                  id="platform-provider-updatedAt"
                  type="datetime-local"
                  className="form-control"
                  name="updatedAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.platformProviderEntity.updatedAt)}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/platform-provider" replace color="info">
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
  platformProviderEntity: storeState.platformProvider.entity,
  loading: storeState.platformProvider.loading,
  updating: storeState.platformProvider.updating,
  updateSuccess: storeState.platformProvider.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlatformProviderUpdate);
