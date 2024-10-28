import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import DailyRation from './daily-ration';
import DailyRationDetail from './daily-ration-detail';
import DailyRationUpdate from './daily-ration-update';
import DailyRationDeleteDialog from './daily-ration-delete-dialog';

const DailyRationRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<DailyRation />} />
    <Route path="new" element={<DailyRationUpdate />} />
    <Route path=":id">
      <Route index element={<DailyRationDetail />} />
      <Route path="edit" element={<DailyRationUpdate />} />
      <Route path="delete" element={<DailyRationDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default DailyRationRoutes;
