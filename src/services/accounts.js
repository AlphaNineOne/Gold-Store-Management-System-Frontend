import axios from 'axios';
import { API_URL } from 'utilities/constants';
import { privateConfig } from './config';

axios.defaults.baseURL = API_URL;

export const addAccountMutation = async body => {
  const { data } = await axios.post('/api/inventory/account/', body, privateConfig());

  return data;
};

export const createBalInventoryMutation = async body => {
  const payload = {
    receivable: body.receivable ? +body.receivable : null,
    payable: body.payable ? +body.payable : null,
    rati: body.rati ? +body.rati : '0.000',
    account: body.account,
    gold_price: body.goldPrice,
    type: body.type,
    description: body.description ? body.description : null,
  };

  const { data } = await axios.post('/api/inventory/balance-report/', payload, privateConfig());

  return data;
};

export const updateBalInventoryMutation = async (id, body) => {
  const payload = {
    receivable: body.receivable ? +body.receivable : null,
    payable: body.payable ? +body.payable : null,
    rati: body.rati ? +body.rati : '0.000',
    account: body.account,
    gold_price: body.goldPrice,
    type: body.type,
    description: body.description ? body.description : null,
  };

  const { data } = await axios.patch(`/api/inventory/balance-report/${id}/`, payload, privateConfig());

  return data;
};
