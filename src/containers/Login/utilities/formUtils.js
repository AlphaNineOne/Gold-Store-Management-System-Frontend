import * as yup from 'yup';

export const loginFormInitValues = {
  email: '',
  password: '',
};

export const loginFormValSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Required'),
  password: yup.string().required('Required'),
});
