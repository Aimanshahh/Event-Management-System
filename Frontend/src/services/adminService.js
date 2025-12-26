import API from './api.js';

/* ======================
   EXPO MANAGEMENT
====================== */
export const createExpo = (data) =>
  API.post('/admin/expos', data);

export const updateExpo = (id, data) =>
  API.put(`/admin/expos/${id}`, data);

export const deleteExpo = (id) =>
  API.delete(`/admin/expos/${id}`);

/* ======================
   BOOTH MANAGEMENT
====================== */
export const assignBooth = (expoId, data) =>
  API.post(`/admin/expos/${expoId}/assign-booth`, data);

/* ======================
   EXPO REGISTRATIONS
====================== */
export const getRegistrationsByExpo = (expoId) =>
  API.get(`/admin/expo/${expoId}/registrations`);

export const updateRegistrationStatus = (id, status) =>
  API.put(`/admin/registration/${id}/status`, { status });

/* ======================
   SESSIONS
====================== */
export const createSession = (expoId, data) =>
  API.post(`/admin/expos/${expoId}/sessions`, data);

export const updateSession = (expoId, sessionId, data) =>
  API.put(`/admin/expos/${expoId}/sessions/${sessionId}`, data);

/* ======================
   ANALYTICS
====================== */
export const getAnalytics = (expoId) =>
  API.get(`/admin/expos/${expoId}/analytics`);
