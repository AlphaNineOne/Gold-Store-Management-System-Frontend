import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { useQuery } from 'react-query';
import { SnackbarProvider } from 'notistack';
import { useDispatch } from 'react-redux';

// COMPONENTS & THEMES
import theme from 'styles/generalCustomTheme';
import { getUserDetailQuery } from 'services/login';
import { getUserDetails, onLogout } from 'store/slices/authSlice';
import AppRoutes from './routes';

function App() {
  const dispatch = useDispatch();

  const { isLoading, data, isError, isSuccess } = useQuery({
    queryKey: ['userDetail'],
    queryFn: getUserDetailQuery,
  });

  useEffect(() => {
    if (isSuccess) dispatch(getUserDetails(data));
    else if (isError) dispatch(onLogout());
  }, [data, isSuccess, isError]);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>{!isLoading && <AppRoutes />}</SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
