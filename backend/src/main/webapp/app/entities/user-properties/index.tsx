import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import UserProperties from './user-properties';
import UserPropertiesDetail from './user-properties-detail';
import UserPropertiesUpdate from './user-properties-update';
import UserPropertiesDeleteDialog from './user-properties-delete-dialog';

const UserPropertiesRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<UserProperties />} />
    <Route path="new" element={<UserPropertiesUpdate />} />
    <Route path=":id">
      <Route index element={<UserPropertiesDetail />} />
      <Route path="edit" element={<UserPropertiesUpdate />} />
      <Route path="delete" element={<UserPropertiesDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default UserPropertiesRoutes;
