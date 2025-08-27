import React from 'react';
import { Box, TableBody, TableCell, TableRow, Typography } from '@mui/material';

function EmptyTableRecord() {
  return (
    <TableBody>
      <TableRow sx={{ height: '150px' }}>
        <TableCell colSpan={20}>
          <Box className="d-flex align-items-center justify-content-center">
            <Typography>No Record Found</Typography>
          </Box>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export default EmptyTableRecord;
