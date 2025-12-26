import express from 'express';
import {
  createExpo,
  updateExpo,
  deleteExpo,
  assignBooth,
  getExhibitorApplications,
  approveExhibitor,
  createSession,
  updateSession,
  getAnalytics,
  getRegistrationsByExpo,      // 🔥 Added
  updateRegistrationStatus     // 🔥 Added
} from '../controllers/adminController.mjs';

import { auth, authorizeRoles } from '../middleware/authMiddleware.mjs';

const router = express.Router();

// --------------------------------------
// Only admins allowed for all routes
// --------------------------------------
router.use(auth, authorizeRoles('admin'));

/* =====================================================
   EXPO MANAGEMENT
===================================================== */
router.post('/expos', createExpo);
router.put('/expos/:id', updateExpo);
router.delete('/expos/:id', deleteExpo);

/* =====================================================
   BOOTH MANAGEMENT
===================================================== */
router.post('/expos/:id/assign-booth', assignBooth);

/* =====================================================
   EXHIBITOR APPLICATIONS (OLD SYSTEM)
===================================================== */
router.get('/expos/:id/applications', getExhibitorApplications);
router.put('/expos/:id/applications/:applicationId', approveExhibitor);

/* =====================================================
   EXPO REGISTRATIONS (NEW SYSTEM)
===================================================== */
router.get('/expo/:expoId/registrations', getRegistrationsByExpo);       
// GET: admin/expo/123/registrations

router.put('/registration/:id/status', updateRegistrationStatus);        
// PUT: admin/registration/123/status

/* =====================================================
   SESSIONS
===================================================== */
router.post('/expos/:id/sessions', createSession);
router.put('/expos/:id/sessions/:sessionId', updateSession);

/* =====================================================
   ANALYTICS
===================================================== */
router.get('/expos/:id/analytics', getAnalytics);

export default router;
