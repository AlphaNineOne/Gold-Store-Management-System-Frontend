import axios from 'axios';
import moment from 'moment';
import { API_URL } from 'utilities/constants';
import { privateConfig } from './config';

axios.defaults.baseURL = API_URL;

export const listAccountKey = ['accountRecords'];
export const getAccountDetailKey = ['getAccountDetails'];
export const getGoldPriceKey = ['getGoldPrice'];
export const listBalanceReportKey = ['listBalanceReport'];

export const listAccountDetailsQuery = async () => {
  const { data } = await axios.get('/api/inventory/account/', privateConfig());

  return data;
};

export const deleteAccountDetailsMutation = async id => {
  const { data } = await axios.delete(`/api/inventory/account/${id}`, privateConfig());

  return data;
};

export const getAccountDetailsByIdQuery = async payload => {
  const { data } = await axios.get('/api/inventory/balance-report/', {
    ...privateConfig(),
    params: {
      min_price: payload.minDate || undefined,
      max_price: payload.maxDate || undefined,
      account: payload.accountId || undefined,
    },
  });

  return data;
};

export const getBalanceReportQuery = async payload => {
  const { data } = await axios.get('/api/inventory/balance-report/', {
    ...privateConfig(),
    params: {
      min_price: payload?.minDate || undefined,
      max_price: payload?.maxDate || undefined,
    },
  });

  return data;
};

export const addGoldPriceMutation = async goldPrice => {
  const { data } = await axios.post('/api/inventory/gold-price/', goldPrice, privateConfig());

  return data;
};

export const updateGoldPriceMutation = async payload => {
  const { data } = await axios.patch(
    `/api/inventory/gold-price/${payload.id}/`,
    payload.body,
    privateConfig()
  );

  return data;
};

export const getGoldPriceQuery = async () => {
  const { data } = await axios.get('/api/inventory/gold-price/', {
    ...privateConfig(),
    params: { date: moment().format('YYYY-MM-DD') },
  });

  return data;
};

export const deleteBalanceReportMutation = async id => {
  const { data } = await axios.delete(`/api/inventory/balance-report/${id}/`, privateConfig());

  return data;
};

export const updateBalanceReportMutation = async payload => {
  let type;
  if (Number(payload?.cash_in) > 0 || Number(payload?.cash_out) > 0) {
    type = 'cash';
  } else if (Number(payload?.rati) === 0) {
    type = 'pure_gold';
  } else {
    type = 'gold';
  }

  const { data } = await axios.patch(
    `/api/inventory/balance-report/${payload.id}/`,
    {
      receivable: (payload?.receivable === '0.000' ? payload?.cash_in : payload?.receivable) || '0.000',
      payable: (payload?.payable === '0.000' ? payload?.cash_out : payload?.payable),
      rati: payload?.rati || '0.000',
      gold_price: payload?.gold_price || '0.000',
      account: payload?.account,
      type,
      description: payload?.description || '',
    },
    privateConfig()
  );

  return data;
};
