import * as yup from 'yup';

export const editReportFormInitVals = {
  receivable: '',
  payable: '',
  rati: '0.000',
  cash_in: '0.000',
  cash_out: '0.000',
  description: '',
};

export const getEditReportFormInitValsSchema = (type = 'gold') => {
  const schema = yup.object().shape({
    receivable: yup.number().min(0, 'Value cannot be negative').nullable(),
    payable: yup.number().min(0, 'Value cannot be negative').nullable(),
    cash_in: yup.number().min(0, 'Value cannot be negative').nullable(),
    cash_out: yup.number().min(0, 'Value cannot be negative').nullable(),
    description: yup.string().nullable(),
    rati: type === 'gold' ? yup.number().min(1, 'Value cannot be negative').required('Required') : yup.number().min(0, 'Value cannot be negative').nullable(),
  });
  return schema;
};
