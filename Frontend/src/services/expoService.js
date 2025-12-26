import API from './api.js';

/* ======================
   PUBLIC
====================== */
export const getExpos = async () => {
  const response = await API.get('/expos');
  return response.data;
};

export const getExpoById = async (id) => {
  const response = await API.get(`/expos/${id}`);
  return response.data;
};

/* ======================
   OWNER-ONLY
====================== */
export const getMyExpos = async () => {
  const response = await API.get('/expos/my');
  return response.data;
};

export const createExpoOwner = async (data) => {
  const response = await API.post('/expos', data);
  return response.data;
};

export const updateExpoOwner = async (id, data) => {
  const response = await API.put(`/expos/${id}`, data);
  return response.data;
};

export const deleteExpoOwner = async (id) => {
  const response = await API.delete(`/expos/${id}`);
  return response.data;
};
