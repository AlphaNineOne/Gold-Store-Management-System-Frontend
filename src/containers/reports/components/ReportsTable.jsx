import React, { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import moment from 'moment';
import propTypes from 'prop-types';

// COMPONENTS & SERVICES
import EmptyTableRecord from 'common/components/EmptyTableRecord';
import ReportsTableHead from './ReportsTableHead';

function ReportsTable({ data }) {
  // CONSTANTS
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const toggleDetailOpen = () => {
    setDetailOpen(prev => !prev);
  };
  console.log(selected);

  const receivableTotal = useMemo(() => data[0]?.total_receivable_gold, [data]);
  const payableTotal = useMemo(() => data[0]?.total_payable_gold, [data]);
  const totalBalance = useMemo(() => receivableTotal - payableTotal, [receivableTotal, payableTotal]);
  const emptyValue = '0.000';

  return (
    <TableContainer>
      <Table sx={{ minWidth: 730 }}>
        <ReportsTableHead />

        {data?.length > 0 ? (
          <TableBody>
            {data?.map(item => (
              <TableRow key={item?.id}>
                <TableCell className="noTableWrap">
                  {moment(item?.created_at)?.format('YYYY-MM-DD')}
                </TableCell>

                <TableCell className="noTableWrap">{moment(item?.created_at)?.format('HH:mm:ss')}</TableCell>

                <TableCell>{item?.account_name}</TableCell>

                <TableCell>{item?.receivable ?? emptyValue}</TableCell>

                <TableCell>
                  <Typography color="red">{item?.payable ?? emptyValue}</Typography>
                </TableCell>

                <TableCell>{item?.rati ?? emptyValue}</TableCell>

                <TableCell>{item?.gold ?? emptyValue}</TableCell>

                <TableCell>{item?.cash_in ?? emptyValue}</TableCell>

                <TableCell>
                  <Typography color="red">{item?.cash_out ?? emptyValue}</Typography>
                </TableCell>
                <TableCell
                  onClick={() => {
                    toggleDetailOpen();
                    setSelected(item);
                  }}
                >
                  {item?.description?.slice(0, 6)?.concat('...') ?? '-'}
                </TableCell>
              </TableRow>
            ))}

            {/* RECEIVABLE TOTAL ROW */}
            <TableRow>
              <TableCell rowSpan={6} colSpan={6} className="border-bottom-0" />
              <TableCell colSpan={3} className="fw-bolder">
                Total Receivable
              </TableCell>

              <TableCell>{parseFloat(receivableTotal).toFixed(3) ?? emptyValue}</TableCell>
            </TableRow>

            {/* PAYABLE TOTAL ROW */}
            <TableRow>
              <TableCell colSpan={3} className="fw-bolder">
                Total Payable
              </TableCell>

              <TableCell>{parseFloat(payableTotal).toFixed(3) ?? emptyValue}</TableCell>
            </TableRow>

            {/* BALANCE TOTAL ROW */}
            <TableRow>
              <TableCell colSpan={3} className="fw-bolder">
                Total Balance
              </TableCell>

              <TableCell>{parseFloat(totalBalance).toFixed(3) ?? emptyValue}</TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <EmptyTableRecord />
        )}
      </Table>
      <Dialog open={detailOpen} onClose={toggleDetailOpen} maxWidth="sm" fullWidth>
        <DialogTitle>Description</DialogTitle>
        <DialogContent>{selected?.description || '_'}</DialogContent>
      </Dialog>
    </TableContainer>
  );
}

ReportsTable.propTypes = {
  data: propTypes.array,
};

ReportsTable.defaultProps = {
  data: [],
};

export default ReportsTable;
