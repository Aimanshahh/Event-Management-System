import API from './api.js';

/* ======================
   PUBLIC
====================== */
export const getEvents = async () => {
  const response = await API.get('/events');  // removed /attendees prefix
  return response.data;
};

export const searchExhibitors = async (query) => {
  const response = await API.get(`/exhibitors/search?q=${query}`);
  return response.data;
};

/* ======================
   ATTENDEE-ONLY
====================== */
export const registerEvent = async (data) => {
  const response = await API.post('/events/register', data);
  return response.data;
};

export const getExhibitorsForExpo = async (expoId) => {
  const response = await API.get(`/events/${expoId}/exhibitors`);
  return response.data;
};
