import React from 'react';
import { Box, Card, Stack } from '@mui/material';
import { Person } from '@mui/icons-material';

// COMPONENTS
import LoginForm from './components/LoginForm';

function LoginPage() {
  return (
    <Box
      sx={{ minHeight: '300px', height: '100vh', background: '#EBEBEB' }}
      className="d-flex align-items-center justify-content-center"
    >
      <Card elevation={5} sx={{ maxWidth: '450px', padding: '20px', width: '100%' }}>
        <Stack justifyContent="center" alignItems="center" gap="20px">
          <Person color="primary" sx={{ width: '70px', height: '70px' }} />

          <LoginForm />
        </Stack>
      </Card>
    </Box>
  );
}

export default LoginPage;
