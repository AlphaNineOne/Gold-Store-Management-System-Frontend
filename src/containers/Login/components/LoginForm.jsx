import React from 'react';
import { Form, Formik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

// COMPONENTS
import FormikField from 'shared/FormikField';
import SubmitBtn from 'shared/SubmitBtn';
import { loginMutation } from 'services/login';
import { onLogin } from 'store/slices/authSlice';
import { loginFormInitValues, loginFormValSchema } from '../utilities/formUtils';

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // API
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: loginMutation,
    onSuccess: () => {
      queryClient.invalidateQueries('userDetail');
    },
  });

  return (
    <Formik
      initialValues={loginFormInitValues}
      validationSchema={loginFormValSchema}
      onSubmit={async values => {
        const loginResp = await mutateAsync(values);

        if (loginResp) {
          navigate('/', { replace: true });
          dispatch(onLogin(loginResp));
        }
      }}
    >
      {() => (
        <Form className="form w-100">
          <FormikField name="email" placeholder="Email" />

          <FormikField name="password" placeholder="Password" type="password" />

          <SubmitBtn label="Login" isLoading={isLoading} />
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
