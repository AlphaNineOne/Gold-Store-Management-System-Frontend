import React from 'react';
import { Box } from '@mui/material';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import FormikField from 'shared/FormikField';
import SubmitBtn from 'shared/SubmitBtn';
import resetPasswordMutation from 'services/auth';
import { useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: resetPasswordMutation,
    onSuccess: () => {
      queryClient.invalidateQueries('userDetail');
    },
  });

  return (
    <Box maxWidth="480px" mx="auto">
      <Formik
        initialValues={{ old_password: '', new_password: '', confirm_password: '' }}
        validationSchema={yup.object({
          old_password: yup.string().required('required'),
          new_password: yup.string().required('required'),
          confirm_password: yup
            .string()
            .oneOf([yup.ref('new_password'), null], 'New password and Old password do not match!')
            .required('Required'),
        })}
        onSubmit={async ({ confirm_password: confirmPassword, ...payload }, { resetForm }) => {
          const res = await mutateAsync(payload);
          if (res?.error) {
            enqueueSnackbar('Something went wrong!', { variant: 'error' });
            return;
          }
          resetForm();
          enqueueSnackbar('Password changed successfully!', { variant: 'success' });
          navigate(-1);
        }}
      >
        <Form className="d-flex flex-column gap-3">
          <FormikField name="old_password" placeholder="Old Password" />
          <FormikField name="new_password" placeholder="New Password" />
          <FormikField name="confirm_password" placeholder="Confirm Password" />
          <Box mx="auto">
            <SubmitBtn label="Submit" isLoading={isLoading} />
          </Box>
        </Form>
      </Formik>
    </Box>
  );
}
