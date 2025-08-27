import axios from 'axios';
import { API_URL } from 'utilities/constants';
import { privateConfig } from './config';

axios.defaults.baseURL = API_URL;

export const loginMutation = async body => {
  const { data } = await axios.post('/api/user/login/', body);

  const token = data?.access;
  localStorage.setItem('token', token);

  return data;
};

export const getUserDetailQuery = async () => {
  const { data } = await axios.get('/api/user/me/', privateConfig());

  return data;
};
