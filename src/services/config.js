export const privateConfig = () => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
  };
};

export const getTokenConfig = token => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
