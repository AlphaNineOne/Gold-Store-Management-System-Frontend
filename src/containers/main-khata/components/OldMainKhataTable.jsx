import React, { useMemo } from 'react';
import { IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Delete } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { Form, Formik } from 'formik';

// COMPONENTS & SERVICES
import { deleteAccountDetailsMutation, listAccountDetailsQuery, listAccountKey } from 'services/mainKhata';
import EmptyTableRecord from 'common/components/EmptyTableRecord';
// import Table from 'common/components/table/Table';
// import TableCell from 'common/components/table/TableCell';
// import TableRow from 'common/components/table/TableRow';
import TableHeader from './TableHeader';
// import { Formik } from 'formik';

function MainKhataTable() {
  const { enqueueSnackbar } = useSnackbar();

  // API SERVICES
  const queryClient = useQueryClient();
  const { data } = useQuery(listAccountKey, listAccountDetailsQuery);
  const { mutateAsync: deleteMutation } = useMutation({
    mutationFn: deleteAccountDetailsMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(listAccountKey);
    },
  });

  const handleDelete = async id => {
    await deleteMutation(id);
    enqueueSnackbar('Account deleted successfully', { variant: 'success' });
  };

  // CONSTANTS
  const totalBalance = useMemo(() => data?.length > 0 && data[0]?.balance_report?.balance, [data]);

  return (
    <TableContainer>
      <Formik>
        {() => (
          <Form>
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

                      <TableCell>{item?.balance_report?.receivable ?? 0}</TableCell>

                      <TableCell>{item?.balance_report?.payable ?? 0}</TableCell>

                      <TableCell>{item?.balance_report?.rati ?? 0}</TableCell>

                      <TableCell>{item?.balance_report?.gold ?? 0}</TableCell>

                      <TableCell>{item?.balance_report?.cash_in ?? 0}</TableCell>

                      <TableCell>{item?.balance_report?.cash_out ?? 0}</TableCell>

                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton onClick={() => handleDelete(item?.id)}>
                            <Delete />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell colSpan={5} rowSpan={2} />

                    <TableCell colSpan={2} className="fw-bolder">
                      My Total Balance
                    </TableCell>

                    <TableCell>{totalBalance}</TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <EmptyTableRecord />
              )}
            </Table>
          </Form>
        )}
      </Formik>
    </TableContainer>
  );
}

export default MainKhataTable;
