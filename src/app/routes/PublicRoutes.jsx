import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router';

function PublicRoutes() {
  const { state } = useLocation();
  const { isAuthenticated } = useSelector(reduxState => reduxState.auth);

  if (!isAuthenticated) {
    return <Outlet />;
  }

  if (state?.from) {
    return <Navigate to={state?.from} />;
  }

  return <Navigate to="/" />;
}

export default PublicRoutes;
