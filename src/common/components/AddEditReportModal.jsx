import React, { useMemo } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Form, Formik } from 'formik';
import propTypes from 'prop-types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';

// COMPONENTS & UTILITIES & SERVICES
import FormikField from 'shared/FormikField';
import SubmitBtn from 'shared/SubmitBtn';
import FormikSelect from 'shared/FormikSelect';
import { createBalInventoryMutation, updateBalInventoryMutation } from 'services/accounts';
import { getGoldPriceKey, getGoldPriceQuery, listAccountKey } from 'services/mainKhata';
import { reportTypeOptions } from 'utilities/constants';
import { addEditReportInitVals, addEditReportValSchema } from 'utilities/formUtils';

function AddEditReportModal({ open, toggle, selected, account, isEdit }) {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  // API SERVICES
  const { mutateAsync: createBalInventory } = useMutation({
    mutationFn: createBalInventoryMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(listAccountKey);
    },
  });
  const { data } = useQuery(getGoldPriceKey, getGoldPriceQuery);
  const goldPrice = useMemo(() => (data?.length > 0 ? data[0]?.id : null), [data]);

  return (
    <Dialog open={open} onClose={toggle} maxWidth="sm" fullWidth>
      <DialogTitle>{`${selected && isEdit ? 'Edit' : 'Create'} Report for ${account?.name}`}</DialogTitle>

      <Formik
        initialValues={addEditReportInitVals}
        validationSchema={addEditReportValSchema}
        onSubmit={async values => {
          if (!data?.length > 0) {
            enqueueSnackbar('Please add gold price first!', { variant: 'error' });
            return;
          }

          if (selected && isEdit) {
            const updateBalInventoryResp = await updateBalInventoryMutation(selected?.id, {
              ...values,
              account: account?.id,
              goldPrice,
            });

            if (updateBalInventoryResp) {
              enqueueSnackbar('Inventory updated successfully!', { variant: 'success' });
              toggle();
            }
          } else {
            const createBalInventoryResp = await createBalInventory({
              ...values,
              account: account?.id,
              goldPrice,
            });

            if (createBalInventoryResp) {
              enqueueSnackbar('Inventory created successfully!', { variant: 'success' });
              toggle();
            }
          }
        }}
      >
        {({ resetForm, values }) => (
          <Form>
            <DialogContent className="d-flex flex-column align-items-start gap-3">
              <FormikField
                name="receivable"
                placeholder="Receivable"
                disabled={!!values?.payable}
                type="number"
              />

              <FormikField
                name="payable"
                placeholder="Payable"
                disabled={!!values?.receivable}
                type="number"
              />

              <FormikField name="rati" placeholder="Ratti" type="number" />
              <FormikField name="description" placeholder="description" />

              <FormikSelect name="type" options={reportTypeOptions} placeholder="Type" />
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

AddEditReportModal.propTypes = {
  open: propTypes.bool.isRequired,
  toggle: propTypes.func.isRequired,
  account: propTypes.object,
  selected: propTypes.object,
  isEdit: propTypes.bool,
};

AddEditReportModal.defaultProps = {
  account: null,
  selected: null,
  isEdit: false,
};

export default AddEditReportModal;
