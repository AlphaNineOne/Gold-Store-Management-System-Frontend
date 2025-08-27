import * as yup from 'yup';

export const addEditReportInitVals = { receivable: null, payable: null, rati: '', type: 'gold', description: '' };

export const addEditReportValSchema = yup.object({
  receivable: yup.number().min(0, "Value can't be negative").nullable(),
  payable: yup.number().min(0, "Value can't be negative").nullable(),
  rati: yup.number().min(0, "Value can't be negative").when('type', (val, schema) => {
    if (val[0] === 'gold') {
      return schema.required('Required');
    }
    return schema.nullable();
  }),
  type: yup.string().required('Required'),
  description: yup.string().nullable(),
});
