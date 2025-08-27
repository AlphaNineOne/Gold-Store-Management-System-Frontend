import axios from 'axios';
import { API_URL } from 'utilities/constants';
import { privateConfig } from './config';

axios.defaults.baseURL = API_URL;

const resetPasswordMutation = async body => {
  try {
    const { data } = await axios.put('/api/user/change/password/', body, privateConfig());

    return data;
  } catch (error) {
    return { error: error.response };
  }
};

export default resetPasswordMutation;
