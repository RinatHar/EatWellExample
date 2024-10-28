import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './user-properties.reducer';

export const UserPropertiesDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const userPropertiesEntity = useAppSelector(state => state.userProperties.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="userPropertiesDetailsHeading">
          <Translate contentKey="eatWellApp.userProperties.detail.title">UserProperties</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{userPropertiesEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="eatWellApp.userProperties.name">Name</Translate>
            </span>
          </dt>
          <dd>{userPropertiesEntity.name}</dd>
          <dt>
            <span id="gender">
              <Translate contentKey="eatWellApp.userProperties.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{userPropertiesEntity.gender}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="eatWellApp.userProperties.date">Date</Translate>
            </span>
          </dt>
          <dd>
            {userPropertiesEntity.date ? <TextFormat value={userPropertiesEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="currentWeight">
              <Translate contentKey="eatWellApp.userProperties.currentWeight">Current Weight</Translate>
            </span>
          </dt>
          <dd>{userPropertiesEntity.currentWeight}</dd>
          <dt>
            <span id="preferredWeight">
              <Translate contentKey="eatWellApp.userProperties.preferredWeight">Preferred Weight</Translate>
            </span>
          </dt>
          <dd>{userPropertiesEntity.preferredWeight}</dd>
          <dt>
            <span id="height">
              <Translate contentKey="eatWellApp.userProperties.height">Height</Translate>
            </span>
          </dt>
          <dd>{userPropertiesEntity.height}</dd>
          <dt>
            <span id="lifestyle">
              <Translate contentKey="eatWellApp.userProperties.lifestyle">Lifestyle</Translate>
            </span>
          </dt>
          <dd>{userPropertiesEntity.lifestyle}</dd>
          <dt>
            <span id="caloriesNeeded">
              <Translate contentKey="eatWellApp.userProperties.caloriesNeeded">Calories Needed</Translate>
            </span>
          </dt>
          <dd>{userPropertiesEntity.caloriesNeeded}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="eatWellApp.userProperties.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {userPropertiesEntity.createdDate ? (
              <TextFormat value={userPropertiesEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifiedDate">
              <Translate contentKey="eatWellApp.userProperties.lastModifiedDate">Last Modified Date</Translate>
            </span>
          </dt>
          <dd>
            {userPropertiesEntity.lastModifiedDate ? (
              <TextFormat value={userPropertiesEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="eatWellApp.userProperties.user">User</Translate>
          </dt>
          <dd>{userPropertiesEntity.user ? userPropertiesEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/user-properties" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-properties/${userPropertiesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default UserPropertiesDetail;
