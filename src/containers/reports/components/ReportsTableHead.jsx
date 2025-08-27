import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';
import { reportsTableHeadCells } from '../utilities/data';

function ReportsTableHead() {
  return (
    <TableHead>
      <TableRow>
        {reportsTableHeadCells?.map(cell => (
          <TableCell key={cell?.label}>{cell?.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default ReportsTableHead;
