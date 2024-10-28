import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './product.reducer';

export const ProductDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const productEntity = useAppSelector(state => state.product.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="productDetailsHeading">
          <Translate contentKey="eatWellApp.product.detail.title">Product</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{productEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="eatWellApp.product.name">Name</Translate>
            </span>
          </dt>
          <dd>{productEntity.name}</dd>
          <dt>
            <span id="photo">
              <Translate contentKey="eatWellApp.product.photo">Photo</Translate>
            </span>
          </dt>
          <dd>{productEntity.photo}</dd>
          <dt>
            <span id="calories">
              <Translate contentKey="eatWellApp.product.calories">Calories</Translate>
            </span>
          </dt>
          <dd>{productEntity.calories}</dd>
          <dt>
            <span id="protein">
              <Translate contentKey="eatWellApp.product.protein">Protein</Translate>
            </span>
          </dt>
          <dd>{productEntity.protein}</dd>
          <dt>
            <span id="fats">
              <Translate contentKey="eatWellApp.product.fats">Fats</Translate>
            </span>
          </dt>
          <dd>{productEntity.fats}</dd>
          <dt>
            <span id="carbohydrates">
              <Translate contentKey="eatWellApp.product.carbohydrates">Carbohydrates</Translate>
            </span>
          </dt>
          <dd>{productEntity.carbohydrates}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="eatWellApp.product.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {productEntity.createdDate ? <TextFormat value={productEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="lastModifiedDate">
              <Translate contentKey="eatWellApp.product.lastModifiedDate">Last Modified Date</Translate>
            </span>
          </dt>
          <dd>
            {productEntity.lastModifiedDate ? (
              <TextFormat value={productEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="eatWellApp.product.user">User</Translate>
          </dt>
          <dd>{productEntity.user ? productEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/product" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/product/${productEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProductDetail;
