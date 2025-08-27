import React, { useMemo, useState } from 'react';
import {
  IconButton,
  Table,
  TableBody,
  Stack,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import moment from 'moment';
import propTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import { Delete, Edit } from '@mui/icons-material';

// COMPONENTS & SERVICES
import EmptyTableRecord from 'common/components/EmptyTableRecord';
import {
  deleteBalanceReportMutation,
  getAccountDetailKey,
  getAccountDetailsByIdQuery,
  listBalanceReportKey,
} from 'services/mainKhata';
import EditReportModal from 'containers/reports/components/EditReportModal';
import AccountTableHeader from './AccountTableHeader';

function AccountTable({ data, onUpdate }) {
  const [selected, setSelected] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const toggleDetailOpen = () => {
    setDetailOpen(prev => !prev);
  };

  // API SERVICES
  const queryClient = useQueryClient();
  const { mutateAsync: deleteMutation } = useMutation({
    mutationFn: deleteBalanceReportMutation,
    onSuccess: () => {
      queryClient.invalidateQueries([listBalanceReportKey, getAccountDetailKey, getAccountDetailsByIdQuery]);
    },
  });

  const handleDelete = async id => {
    await deleteMutation(id);
    onUpdate();
  };

  const handleEdit = async obj => {
    setSelected(obj);
    setEditModalOpen(true);
  };

  const handleClose = () => {
    setEditModalOpen(false);
  };

  const receivableTotal = useMemo(() => data[0]?.total_receivable_gold, [data]);
  const payableTotal = useMemo(() => data[0]?.total_payable_gold, [data]);
  const totalBalance = useMemo(() => receivableTotal - payableTotal, [receivableTotal, payableTotal]);
  const emptyValue = '0.000';
  return (
    <TableContainer>
      <Table sx={{ minWidth: 730 }}>
        <AccountTableHeader />

        {data?.length > 0 ? (
          <TableBody>
            {data?.map(item => (
              <TableRow key={item?.id}>
                <TableCell className="noTableWrap">
                  {moment(item?.created_at)?.format('YYYY-MM-DD')}
                </TableCell>

                <TableCell className="noTableWrap">{moment(item?.created_at)?.format('HH:mm:ss')}</TableCell>

                <TableCell>{item?.receivable ?? emptyValue}</TableCell>

                <TableCell>
                  <Typography color="red">{item?.payable ?? emptyValue} </Typography>
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
                  {item?.description?.slice(0, 6)?.concat('...') ?? '-'}{' '}
                </TableCell>

                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton title="Delete" onClick={() => handleDelete(item?.id)}>
                      <Delete />
                    </IconButton>

                    <IconButton title="Edit" onClick={() => handleEdit(item)}>
                      <Edit />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}

            {/* RECEIVABLE TOTAL ROW */}
            <TableRow>
              <TableCell rowSpan={6} colSpan={6} className="border-bottom-0" />
              <TableCell colSpan={3} className="fw-bolder">
                Total Receivable
              </TableCell>

              <TableCell>{parseFloat(receivableTotal).toFixed(3) || emptyValue}</TableCell>
            </TableRow>

            {/* Payalbal TOTAL ROW */}
            <TableRow>
              <TableCell colSpan={3} className="fw-bolder">
                Total Payable
              </TableCell>

              <TableCell>{parseFloat(payableTotal).toFixed(3) || emptyValue}</TableCell>
            </TableRow>

            {/* balance TOTAL ROW */}
            <TableRow>
              <TableCell colSpan={3} className="fw-bolder">
                Total Balance
              </TableCell>

              <TableCell>{parseFloat(totalBalance).toFixed(3) || emptyValue}</TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <EmptyTableRecord />
        )}
      </Table>

      <EditReportModal onUpdate={onUpdate} open={isEditModalOpen} selected={selected} toggle={handleClose} />
      <Dialog open={detailOpen} onClose={toggleDetailOpen} maxWidth="sm" fullWidth>
        <DialogTitle>Description</DialogTitle>
        <DialogContent>{selected?.description || '_'}</DialogContent>
      </Dialog>
    </TableContainer>
  );
}

AccountTable.propTypes = {
  data: propTypes.array,
  onUpdate: propTypes.func,
};

AccountTable.defaultProps = {
  onUpdate: () => {},
  data: [],
};

export default AccountTable;
