import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './platform-provider.reducer';
import { IPlatformProvider } from 'app/shared/model/platform-provider.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlatformProviderDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlatformProviderDetail = (props: IPlatformProviderDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { platformProviderEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          PlatformProvider [<b>{platformProviderEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="providerId">Provider Id</span>
          </dt>
          <dd>{platformProviderEntity.providerId}</dd>
          <dt>
            <span id="providerExtId">Provider Ext Id</span>
          </dt>
          <dd>{platformProviderEntity.providerExtId}</dd>
          <dt>
            <span id="providerName">Provider Name</span>
          </dt>
          <dd>{platformProviderEntity.providerName}</dd>
          <dt>
            <span id="providerStatus">Provider Status</span>
          </dt>
          <dd>{platformProviderEntity.providerStatus}</dd>
          <dt>
            <span id="validUpto">Valid Upto</span>
          </dt>
          <dd>
            {platformProviderEntity.validUpto ? (
              <TextFormat value={platformProviderEntity.validUpto} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="activatedOn">Activated On</span>
          </dt>
          <dd>
            {platformProviderEntity.activatedOn ? (
              <TextFormat value={platformProviderEntity.activatedOn} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="createdAt">Created At</span>
          </dt>
          <dd>
            {platformProviderEntity.createdAt ? (
              <TextFormat value={platformProviderEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="updatedAt">Updated At</span>
          </dt>
          <dd>
            {platformProviderEntity.updatedAt ? (
              <TextFormat value={platformProviderEntity.updatedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/platform-provider" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/platform-provider/${platformProviderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ platformProvider }: IRootState) => ({
  platformProviderEntity: platformProvider.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlatformProviderDetail);
