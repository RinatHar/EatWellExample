import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './daily-ration.reducer';

export const DailyRationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const dailyRationEntity = useAppSelector(state => state.dailyRation.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="dailyRationDetailsHeading">
          <Translate contentKey="eatWellApp.dailyRation.detail.title">DailyRation</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{dailyRationEntity.id}</dd>
          <dt>
            <span id="productWeight">
              <Translate contentKey="eatWellApp.dailyRation.productWeight">Product Weight</Translate>
            </span>
          </dt>
          <dd>{dailyRationEntity.productWeight}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="eatWellApp.dailyRation.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {dailyRationEntity.createdDate ? (
              <TextFormat value={dailyRationEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifiedDate">
              <Translate contentKey="eatWellApp.dailyRation.lastModifiedDate">Last Modified Date</Translate>
            </span>
          </dt>
          <dd>
            {dailyRationEntity.lastModifiedDate ? (
              <TextFormat value={dailyRationEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="eatWellApp.dailyRation.user">User</Translate>
          </dt>
          <dd>{dailyRationEntity.user ? dailyRationEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="eatWellApp.dailyRation.product">Product</Translate>
          </dt>
          <dd>{dailyRationEntity.product ? dailyRationEntity.product.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/daily-ration" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/daily-ration/${dailyRationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default DailyRationDetail;
