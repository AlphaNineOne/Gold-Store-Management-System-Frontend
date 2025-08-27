import React from 'react';
import { Box, CircularProgress } from '@mui/material';

function GlobalLoader() {
  return (
    <Box
      minHeight="500px"
      height="100vh"
      maxHeight="100vh"
      className="d-flex align-items-center justify-content-center"
    >
      <CircularProgress />
    </Box>
  );
}

export default GlobalLoader;
