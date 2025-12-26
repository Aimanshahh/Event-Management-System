import API from './api.js';

export const signup = async (data) => {
  const response = await API.post('/auth/signup', data);
  return response.data;
};

export const login = async (data) => {
  const response = await API.post('/auth/login', data);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
