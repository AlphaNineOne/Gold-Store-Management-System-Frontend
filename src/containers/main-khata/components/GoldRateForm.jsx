import React, { useMemo } from 'react';
import { Box, Button, Collapse, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import moment from 'moment';

// COMPONENTS & UTILITIES & SERVICES
import FormikField from 'shared/FormikField';
import SubmitBtn from 'shared/SubmitBtn';
import {
  addGoldPriceMutation,
  getGoldPriceKey,
  getGoldPriceQuery,
  updateGoldPriceMutation,
} from 'services/mainKhata';
import { goldPriceFormInitVals, goldPriceFormValSchema } from '../utilities/formUtils';

function GoldRateForm() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  // API SERVICES
  const { data: todayGoldPrice } = useQuery(getGoldPriceKey, getGoldPriceQuery);
  const { mutateAsync } = useMutation({
    mutationFn: addGoldPriceMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(getGoldPriceKey);
    },
  });
  const { mutateAsync: updateGoldPrice } = useMutation({
    mutationFn: updateGoldPriceMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(getGoldPriceKey);
    },
  });

  // CONSTANTS
  const goldPrice = useMemo(
    () => (todayGoldPrice?.length > 0 ? todayGoldPrice[0]?.price : 'NA'),
    [todayGoldPrice]
  );

  const goldPriceId = useMemo(() => todayGoldPrice?.length > 0 && todayGoldPrice[0]?.id, [todayGoldPrice]);

  return (
    <Formik
      initialValues={goldPriceFormInitVals}
      validationSchema={goldPriceFormValSchema}
      onSubmit={async (values, { resetForm }) => {
        if (goldPrice) {
          await updateGoldPrice({ body: values, id: goldPriceId });
          enqueueSnackbar('Gold rate updated successfully', { variant: 'success' });
        } else {
          await mutateAsync({ ...values, date: moment().format('YYYY-MM-DD') });

          enqueueSnackbar('Gold rate added successfully', { variant: 'success' });
        }
        resetForm();
      }}
    >
      {({ values, resetForm }) => (
        <Form className="d-flex align-items-center gap-2">
          <Typography variant="body1">Daily Gold Rate:</Typography>

          <Box maxWidth="200px">
            <FormikField name="price" type="number" placeholder="Type price" />
          </Box>

          <Collapse orientation="horizontal" in={!!values.price}>
            <Stack direction="row" spacing={2}>
              <SubmitBtn label="Save" isLoading={false} />

              <Button onClick={resetForm}>Cancel</Button>
            </Stack>
          </Collapse>
        </Form>
      )}
    </Formik>
  );
}

export default GoldRateForm;
