import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './platform-user.reducer';
import { IPlatformUser } from 'app/shared/model/platform-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlatformUserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlatformUserDetail = (props: IPlatformUserDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { platformUserEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          PlatformUser [<b>{platformUserEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="userId">User Id</span>
          </dt>
          <dd>{platformUserEntity.userId}</dd>
          <dt>
            <span id="userExtId">User Ext Id</span>
          </dt>
          <dd>{platformUserEntity.userExtId}</dd>
          <dt>
            <span id="userName">User Name</span>
          </dt>
          <dd>{platformUserEntity.userName}</dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{platformUserEntity.status}</dd>
          <dt>
            <span id="validUpto">Valid Upto</span>
          </dt>
          <dd>
            {platformUserEntity.validUpto ? <TextFormat value={platformUserEntity.validUpto} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="activatedOn">Activated On</span>
          </dt>
          <dd>
            {platformUserEntity.activatedOn ? (
              <TextFormat value={platformUserEntity.activatedOn} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="createdAt">Created At</span>
          </dt>
          <dd>
            {platformUserEntity.createdAt ? <TextFormat value={platformUserEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedAt">Updated At</span>
          </dt>
          <dd>
            {platformUserEntity.updatedAt ? <TextFormat value={platformUserEntity.updatedAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>Provider</dt>
          <dd>{platformUserEntity.provider ? platformUserEntity.provider.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/platform-user" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/platform-user/${platformUserEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ platformUser }: IRootState) => ({
  platformUserEntity: platformUser.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlatformUserDetail);
