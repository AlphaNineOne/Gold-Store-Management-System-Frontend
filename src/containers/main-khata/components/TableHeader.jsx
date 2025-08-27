import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';

// COMPONENTS & UTILITIES
import { tableHeadData } from '../utilities/data';

function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        {tableHeadData?.map(cell => (
          <TableCell key={cell?.label}>
            {cell?.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
