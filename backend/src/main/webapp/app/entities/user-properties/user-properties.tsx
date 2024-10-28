import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { TextFormat, Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './user-properties.reducer';

export const UserProperties = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const userPropertiesList = useAppSelector(state => state.userProperties.entities);
  const loading = useAppSelector(state => state.userProperties.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    }
    return order === ASC ? faSortUp : faSortDown;
  };

  return (
    <div>
      <h2 id="user-properties-heading" data-cy="UserPropertiesHeading">
        <Translate contentKey="eatWellApp.userProperties.home.title">User Properties</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="eatWellApp.userProperties.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/user-properties/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="eatWellApp.userProperties.home.createLabel">Create new User Properties</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {userPropertiesList && userPropertiesList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="eatWellApp.userProperties.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="eatWellApp.userProperties.name">Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
                </th>
                <th className="hand" onClick={sort('gender')}>
                  <Translate contentKey="eatWellApp.userProperties.gender">Gender</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('gender')} />
                </th>
                <th className="hand" onClick={sort('date')}>
                  <Translate contentKey="eatWellApp.userProperties.date">Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('date')} />
                </th>
                <th className="hand" onClick={sort('currentWeight')}>
                  <Translate contentKey="eatWellApp.userProperties.currentWeight">Current Weight</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('currentWeight')} />
                </th>
                <th className="hand" onClick={sort('preferredWeight')}>
                  <Translate contentKey="eatWellApp.userProperties.preferredWeight">Preferred Weight</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('preferredWeight')} />
                </th>
                <th className="hand" onClick={sort('height')}>
                  <Translate contentKey="eatWellApp.userProperties.height">Height</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('height')} />
                </th>
                <th className="hand" onClick={sort('lifestyle')}>
                  <Translate contentKey="eatWellApp.userProperties.lifestyle">Lifestyle</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('lifestyle')} />
                </th>
                <th className="hand" onClick={sort('caloriesNeeded')}>
                  <Translate contentKey="eatWellApp.userProperties.caloriesNeeded">Calories Needed</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('caloriesNeeded')} />
                </th>
                <th className="hand" onClick={sort('createdDate')}>
                  <Translate contentKey="eatWellApp.userProperties.createdDate">Created Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('createdDate')} />
                </th>
                <th className="hand" onClick={sort('lastModifiedDate')}>
                  <Translate contentKey="eatWellApp.userProperties.lastModifiedDate">Last Modified Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('lastModifiedDate')} />
                </th>
                <th>
                  <Translate contentKey="eatWellApp.userProperties.user">User</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userPropertiesList.map((userProperties, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/user-properties/${userProperties.id}`} color="link" size="sm">
                      {userProperties.id}
                    </Button>
                  </td>
                  <td>{userProperties.name}</td>
                  <td>
                    <Translate contentKey={`eatWellApp.Gender.${userProperties.gender}`} />
                  </td>
                  <td>
                    {userProperties.date ? <TextFormat type="date" value={userProperties.date} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{userProperties.currentWeight}</td>
                  <td>{userProperties.preferredWeight}</td>
                  <td>{userProperties.height}</td>
                  <td>
                    <Translate contentKey={`eatWellApp.Lifestyle.${userProperties.lifestyle}`} />
                  </td>
                  <td>{userProperties.caloriesNeeded}</td>
                  <td>
                    {userProperties.createdDate ? (
                      <TextFormat type="date" value={userProperties.createdDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {userProperties.lastModifiedDate ? (
                      <TextFormat type="date" value={userProperties.lastModifiedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{userProperties.user ? userProperties.user.id : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/user-properties/${userProperties.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/user-properties/${userProperties.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/user-properties/${userProperties.id}/delete`)}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="eatWellApp.userProperties.home.notFound">No User Properties found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UserProperties;
