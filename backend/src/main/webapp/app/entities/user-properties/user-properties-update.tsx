import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { Gender } from 'app/shared/model/enumerations/gender.model';
import { Lifestyle } from 'app/shared/model/enumerations/lifestyle.model';
import { createEntity, getEntity, reset, updateEntity } from './user-properties.reducer';

export const UserPropertiesUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const userPropertiesEntity = useAppSelector(state => state.userProperties.entity);
  const loading = useAppSelector(state => state.userProperties.loading);
  const updating = useAppSelector(state => state.userProperties.updating);
  const updateSuccess = useAppSelector(state => state.userProperties.updateSuccess);
  const genderValues = Object.keys(Gender);
  const lifestyleValues = Object.keys(Lifestyle);

  const handleClose = () => {
    navigate('/user-properties');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    if (values.currentWeight !== undefined && typeof values.currentWeight !== 'number') {
      values.currentWeight = Number(values.currentWeight);
    }
    if (values.preferredWeight !== undefined && typeof values.preferredWeight !== 'number') {
      values.preferredWeight = Number(values.preferredWeight);
    }
    if (values.height !== undefined && typeof values.height !== 'number') {
      values.height = Number(values.height);
    }
    if (values.caloriesNeeded !== undefined && typeof values.caloriesNeeded !== 'number') {
      values.caloriesNeeded = Number(values.caloriesNeeded);
    }
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.lastModifiedDate = convertDateTimeToServer(values.lastModifiedDate);

    const entity = {
      ...userPropertiesEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          createdDate: displayDefaultDateTime(),
          lastModifiedDate: displayDefaultDateTime(),
        }
      : {
          gender: 'MALE',
          lifestyle: 'SEDENTARY',
          ...userPropertiesEntity,
          createdDate: convertDateTimeFromServer(userPropertiesEntity.createdDate),
          lastModifiedDate: convertDateTimeFromServer(userPropertiesEntity.lastModifiedDate),
          user: userPropertiesEntity?.user?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="eatWellApp.userProperties.home.createOrEditLabel" data-cy="UserPropertiesCreateUpdateHeading">
            <Translate contentKey="eatWellApp.userProperties.home.createOrEditLabel">Create or edit a UserProperties</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="user-properties-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('eatWellApp.userProperties.name')}
                id="user-properties-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('eatWellApp.userProperties.gender')}
                id="user-properties-gender"
                name="gender"
                data-cy="gender"
                type="select"
              >
                {genderValues.map(gender => (
                  <option value={gender} key={gender}>
                    {translate(`eatWellApp.Gender.${gender}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('eatWellApp.userProperties.date')}
                id="user-properties-date"
                name="date"
                data-cy="date"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('eatWellApp.userProperties.currentWeight')}
                id="user-properties-currentWeight"
                name="currentWeight"
                data-cy="currentWeight"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('eatWellApp.userProperties.preferredWeight')}
                id="user-properties-preferredWeight"
                name="preferredWeight"
                data-cy="preferredWeight"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('eatWellApp.userProperties.height')}
                id="user-properties-height"
                name="height"
                data-cy="height"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('eatWellApp.userProperties.lifestyle')}
                id="user-properties-lifestyle"
                name="lifestyle"
                data-cy="lifestyle"
                type="select"
              >
                {lifestyleValues.map(lifestyle => (
                  <option value={lifestyle} key={lifestyle}>
                    {translate(`eatWellApp.Lifestyle.${lifestyle}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('eatWellApp.userProperties.caloriesNeeded')}
                id="user-properties-caloriesNeeded"
                name="caloriesNeeded"
                data-cy="caloriesNeeded"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('eatWellApp.userProperties.createdDate')}
                id="user-properties-createdDate"
                name="createdDate"
                data-cy="createdDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('eatWellApp.userProperties.lastModifiedDate')}
                id="user-properties-lastModifiedDate"
                name="lastModifiedDate"
                data-cy="lastModifiedDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                id="user-properties-user"
                name="user"
                data-cy="user"
                label={translate('eatWellApp.userProperties.user')}
                type="select"
              >
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/user-properties" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserPropertiesUpdate;
