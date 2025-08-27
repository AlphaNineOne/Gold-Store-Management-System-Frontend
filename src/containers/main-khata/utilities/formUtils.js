import * as yup from 'yup';

export const addAccountInitValues = { name: '' };

export const addAccountValSchema = yup.object({
  name: yup.string().required('Required'),
});

export const goldPriceFormInitVals = { price: '' };

export const goldPriceFormValSchema = yup.object({
  price: yup.number().min(0, "Value can't be negative"),
});
