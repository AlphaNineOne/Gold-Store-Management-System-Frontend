import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

// LAYOUT WRAPPER
import PrivateLayoutWrapper from 'common/layout/private';

function PrivateRoutes() {
  const { pathname } = useLocation();

  const { isAuthenticated } = useSelector(reduxState => reduxState.auth);

  return isAuthenticated ? (
    <PrivateLayoutWrapper />
  ) : (
    <Navigate to="/auth/login" state={{ from: pathname }} />
  );
}

export default PrivateRoutes;
