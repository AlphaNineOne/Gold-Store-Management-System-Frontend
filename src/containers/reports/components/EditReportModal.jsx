/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Form, Formik } from 'formik';
import propTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';

// UTILITIES & COMPONENTS
import {
  getAccountDetailKey,
  getAccountDetailsByIdQuery,
  listBalanceReportKey,
  updateBalanceReportMutation,
} from 'services/mainKhata';
import FormikField from 'shared/FormikField';
import SubmitBtn from 'shared/SubmitBtn';
import { editReportFormInitVals, getEditReportFormInitValsSchema } from '../utilities/formUtils';

function EditReportModal({ open, toggle, selected, onUpdate }) {
  const [initValues, setInitValues] = useState(editReportFormInitVals);
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: updateBalanceReportMutation,
    onSuccess: () => {
      queryClient.invalidateQueries([listBalanceReportKey, getAccountDetailKey, getAccountDetailsByIdQuery]);
    },
  });

  useEffect(() => {
    if (selected) {
      setInitValues({ ...selected });
    }
  }, [selected]);

  let type;
  if (Number(selected?.cash_in) > 0 || Number(selected?.cash_out) > 0) {
    type = 'cash';
  } else if (Number(selected?.rati) === 0) {
    type = 'pure_gold';
  } else {
    type = 'gold';
  }

  return (
    <Dialog open={open} onClose={toggle} maxWidth="sm" fullWidth>
      <DialogTitle>{`Edit ${selected?.account_name} Report`}</DialogTitle>

      <Formik
        enableReinitialize
        initialValues={initValues}
        validationSchema={getEditReportFormInitValsSchema(type)}
        onSubmit={async values => {
          const editReportResp = await mutateAsync({ id: selected?.id, ...values });
          onUpdate();
          if (editReportResp) {
            enqueueSnackbar('Report updated successfully!', { variant: 'success' });
            toggle();
          }
        }}
      >
        {({ resetForm, values }) => {
          const payableDisabled = Number(values?.receivable) > 0;
          const receivableDisabled = Number(values?.payable) > 0;
          return (
            <Form>
              <DialogContent className="d-flex flex-column align-items-start gap-3">
                <FormikField
                  name={values.receivable === '0.000' ? 'cash_in' : 'receivable'}
                  placeholder="Receivable"
                  disabled={receivableDisabled}
                />

                <FormikField
                  name={values.payable === '0.000' ? 'cash_out' : 'payable'}
                  placeholder="Payable"
                  disabled={payableDisabled}
                />

                <FormikField name="rati" placeholder="Ratti" />
                <FormikField name="description" placeholder="Description" />
              </DialogContent>

              <DialogActions>
                <SubmitBtn label="Update" />

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
          );
        }}
      </Formik>
    </Dialog>
  );
}

EditReportModal.propTypes = {
  open: propTypes.bool.isRequired,
  toggle: propTypes.func.isRequired,
  selected: propTypes.object,
  onUpdate: propTypes.func,
};

EditReportModal.defaultProps = {
  onUpdate: () => {},
  selected: null,
};

export default EditReportModal;
