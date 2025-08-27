import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalLoader from '../../common/loaders/GlobalLoader';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

// CONTAINERS
const MainKhata = lazy(() => import('containers/main-khata'));
const LoginPage = lazy(() => import('containers/Login'));
const Reports = lazy(() => import('containers/reports'));
const AccountDetals = lazy(() => import('containers/account-details'));
const ResetPassword = lazy(() => import('containers/reset-password'));

function AppRoutes() {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoutes />}>
            <Route path="auth/login" element={<LoginPage />} />
          </Route>

          <Route path="/" element={<PrivateRoutes />}>
            <Route index element={<MainKhata />} />
            <Route path="account/:accountName/:accountId" element={<AccountDetals />} />
            <Route path="reports" element={<Reports />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default AppRoutes;
