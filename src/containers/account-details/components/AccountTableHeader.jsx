import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { accountTableHeadCells } from '../utilities/data';

function AccountTableHeader() {
  return (
    <TableHead>
      <TableRow>
        {accountTableHeadCells?.map(cell => (
          <TableCell key={cell?.label}>{cell?.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default AccountTableHeader;
