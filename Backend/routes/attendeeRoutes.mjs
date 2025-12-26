// backend/routes/attendeeRoutes.mjs
import express from 'express';   // ✅ THIS LINE WAS MISSING

import {
  getEvents,
  registerEvent,
  getExhibitors,
  searchExhibitors
} from '../controllers/attendeeController.mjs';

import { auth, authorizeRoles } from '../middleware/authMiddleware.mjs';

const router = express.Router();

/* -------------------------
   PUBLIC ROUTES
------------------------- */

// Get all expos/events
router.get('/events', getEvents);

// Search exhibitors
router.get('/exhibitors/search', searchExhibitors);

/* -------------------------
   ATTENDEE-ONLY ROUTES
------------------------- */

// Register for an expo/event
router.post('/events/register', auth, authorizeRoles('attendee'), registerEvent);

// Get exhibitors for a specific expo
router.get(
  '/events/:expoId/exhibitors',
  auth,
  authorizeRoles('attendee'),
  getExhibitors
);

export default router;
