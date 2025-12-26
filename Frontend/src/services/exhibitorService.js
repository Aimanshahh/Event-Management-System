import API from './api.js';

/* ======================
   PUBLIC EXHIBITOR CRUD
====================== */
export const getAllExhibitors = async () => {
  const response = await API.get('/exhibitors');
  return response.data;
};

export const getExhibitorById = async (id) => {
  const response = await API.get(`/exhibitors/${id}`);
  return response.data;
};

/* ======================
   ADMIN-ONLY EXHIBITOR CRUD
====================== */
export const createExhibitor = async (data) => {
  const response = await API.post('/exhibitors', data);
  return response.data;
};

export const updateExhibitor = async (id, data) => {
  const response = await API.put(`/exhibitors/${id}`, data);
  return response.data;
};

/* ======================
   EXHIBITOR-ONLY
====================== */
export const viewAvailableBooths = async (expoId) => {
  const response = await API.get(`/exhibitors/${expoId}/booths`);
  return response.data;
};

export const reserveBooth = async (data) => {
  const response = await API.post('/exhibitors/reserve-booth', data);
  return response.data;
};

export const registerForExpo = async (data) => {
  const response = await API.post('/exhibitors/register-expo', data);
  return response.data;
};

export const messageAdmin = async (data) => {
  const response = await API.post('/exhibitors/message-admin', data);
  return response.data;
};
