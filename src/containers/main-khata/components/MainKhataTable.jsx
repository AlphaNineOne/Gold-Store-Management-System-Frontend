import React, { useMemo, useState, useReducer } from 'react';
import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
// useMutation,, useQueryClient
import { Add } from '@mui/icons-material';
// Delete add here
// import { useSnackbar } from 'notistack';

// COMPONENTS & SERVICES
import { listAccountDetailsQuery, listAccountKey } from 'services/mainKhata';
// deleteAccountDetailsMutation,
import EmptyTableRecord from 'common/components/EmptyTableRecord';
import AddEditReportModal from 'common/components/AddEditReportModal';
import { addEditReportReducer, addEditReportReducerState } from 'utilities/reducers';
import TableHeader from './TableHeader';

function MainKhataTable() {
  // const { enqueueSnackbar } = useSnackbar();
  const [addEditState, dispatchAddEdit] = useReducer(addEditReportReducer, addEditReportReducerState);
  const { selected, isEditModalOpen, account } = addEditState;
  const [detailOpen, setDetailOpen] = useState(false);
  const toggleDetailOpen = () => {
    setDetailOpen(prev => !prev);
  };

  // API SERVICES
  // const queryClient = useQueryClient();
  const { data } = useQuery(listAccountKey, listAccountDetailsQuery);
  // const { mutateAsync: deleteMutation } = useMutation({
  //   mutationFn: deleteAccountDetailsMutation,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(listAccountKey);
  //   },
  // });

  // const handleDelete = async id => {
  //   await deleteMutation(id);
  //   enqueueSnackbar('Account deleted successfully', { variant: 'success' });
  // };

  const handleOpenAddEdtModal = selectedObj => {
    const selectedAccount = { id: selectedObj?.id, name: selectedObj?.name };
    dispatchAddEdit({
      type: 'open',
      payload: { account: selectedAccount, selected: selectedObj?.balance_report },
    });
  };
  const handleCloseAddEdtModal = () => dispatchAddEdit({ type: 'close' });

  // CONSTANTS
  const emptyValue = '0.000';
  const totalBalance = useMemo(() => data?.length > 0 && data[0]?.balance_report?.balance, [data]);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHeader />

          {data?.length > 0 ? (
            <TableBody>
              {data?.map(item => (
                <TableRow hover key={item?.id}>
                  <TableCell>
                    <Link to={`/account/${item?.name}/${item?.id}`} className="clearLink">
                      {item?.name}
                    </Link>
                  </TableCell>

                  <TableCell>{item?.balance_report?.receivable ?? emptyValue}</TableCell>

                  <TableCell>
                    <Typography color="red">{item?.balance_report?.payable ?? emptyValue}</Typography>
                  </TableCell>

                  <TableCell>{item?.balance_report?.rati ?? emptyValue}</TableCell>

                  <TableCell>{item?.balance_report?.gold ?? emptyValue}</TableCell>

                  <TableCell>{item?.balance_report?.cash_in ?? emptyValue}</TableCell>

                  <TableCell>
                    <Typography color="red">{item?.balance_report?.cash_out ?? emptyValue}</Typography>
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      toggleDetailOpen();
                      dispatchAddEdit({ type: 'select', payload: { selected: item } });
                    }}
                  >
                    {item?.balance_report?.description?.slice(0, 6)?.concat('...') ?? '-'}
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Add Inventory">
                        <IconButton onClick={() => handleOpenAddEdtModal(item)}>
                          <Add />
                        </IconButton>
                      </Tooltip>

                      {/* <Tooltip title="Delete Account">
                        <IconButton onClick={() => handleDelete(item?.id)}>
                          <Delete />
                        </IconButton>
                      </Tooltip> */}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell colSpan={6} rowSpan={3} />

                <TableCell colSpan={2} className="fw-bolder">
                  My Total Balance
                </TableCell>

                <TableCell>{totalBalance || '0.000'}</TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <EmptyTableRecord />
          )}
        </Table>
        <Dialog open={detailOpen} onClose={toggleDetailOpen} maxWidth="sm" fullWidth>
          <DialogTitle>Description</DialogTitle>
          <DialogContent>{selected?.balance_report?.description || '_'}</DialogContent>
        </Dialog>
      </TableContainer>

      <AddEditReportModal
        open={isEditModalOpen}
        selected={selected}
        toggle={handleCloseAddEdtModal}
        account={account}
      />
    </>
  );
}

export default MainKhataTable;
