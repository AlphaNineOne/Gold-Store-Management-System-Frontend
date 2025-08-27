import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Form, Formik } from 'formik';
import propTypes from 'prop-types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';

// COMPONENTS & UTILITIES & SERVICES
import FormikField from 'shared/FormikField';
import SubmitBtn from 'shared/SubmitBtn';
import { addAccountMutation } from 'services/accounts';
import { getGoldPriceKey, getGoldPriceQuery, listAccountKey } from 'services/mainKhata';
import { addAccountInitValues, addAccountValSchema } from '../utilities/formUtils';

function AddAccountModal({ open, toggle }) {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  // API SERVICES
  const { mutateAsync } = useMutation({
    mutationFn: addAccountMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(listAccountKey);
    },
  });
  const { data } = useQuery(getGoldPriceKey, getGoldPriceQuery);

  return (
    <Dialog open={open} onClose={toggle} maxWidth="sm" fullWidth>
      <DialogTitle>Add Account</DialogTitle>

      <Formik
        initialValues={addAccountInitValues}
        validationSchema={addAccountValSchema}
        onSubmit={async values => {
          if (!data?.length > 0) {
            enqueueSnackbar('Please add gold price first!', { variant: 'error' });
            return;
          }

          const addAccountResp = await mutateAsync({ name: values?.name });

          if (addAccountResp) {
            enqueueSnackbar('Account added successfully!', { variant: 'success' });
            toggle();
          }
        }}
      >
        {({ resetForm }) => (
          <Form>
            <DialogContent className="d-flex flex-column align-items-start gap-3">
              <FormikField name="name" placeholder="Name*" />
            </DialogContent>

            <DialogActions>
              <SubmitBtn label="Submit" />

              <Button
                onClick={() => {
                  resetForm();
                  toggle();
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

AddAccountModal.propTypes = {
  open: propTypes.bool.isRequired,
  toggle: propTypes.func.isRequired,
};

export default AddAccountModal;
