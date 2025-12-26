import express from 'express';
import {
  getAllExhibitors,
  getExhibitorById,
  createExhibitor,
  updateExhibitor,
  viewAvailableBooths,
  reserveBooth,
  messageAdmin,
  registerForExpo        // 🔥 Added
} from '../controllers/exhibitorController.mjs';

import { auth, authorizeRoles } from '../middleware/authMiddleware.mjs';

const router = express.Router();

// ----------------------
// Public routes
// ----------------------
router.get('/', getAllExhibitors);             
router.get('/:id', getExhibitorById);          

// ----------------------
// Admin-only routes
// ----------------------
router.post('/', auth, authorizeRoles('admin'), createExhibitor);
router.put('/:id', auth, authorizeRoles('admin'), updateExhibitor);

// ----------------------
// Exhibitor-only routes
// ----------------------
router.get('/:expoId/booths', auth, authorizeRoles('exhibitor'), viewAvailableBooths);
router.post('/reserve-booth', auth, authorizeRoles('exhibitor'), reserveBooth);
router.post('/message-admin', auth, authorizeRoles('exhibitor'), messageAdmin);

// ----------------------
// EXPO REGISTRATION (EXHIBITOR)
// ----------------------
router.post('/register-expo', auth, authorizeRoles('exhibitor'), registerForExpo);  
// POST /api/exhibitors/register-expo

export default router;
