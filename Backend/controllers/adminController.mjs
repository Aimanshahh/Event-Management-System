import Expo from '../models/expo.mjs';
import ExpoRegistration from '../models/expoRegistration.mjs';


/* =====================================================
   EXPO MANAGEMENT (Moved from ExpoController)
===================================================== */

// Create Expo
export const createExpo = async (req, res) => {
  try {
    const expo = await Expo.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json({ success: true, data: expo });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update Expo
export const updateExpo = async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id);
    if (!expo) return res.status(404).json({ success: false, error: 'Expo not found' });

    const updatedExpo = await Expo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, data: updatedExpo });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete Expo
export const deleteExpo = async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id);
    if (!expo) return res.status(404).json({ success: false, error: 'Expo not found' });

    await expo.deleteOne();
    res.json({ success: true, message: 'Expo deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* =====================================================
   BOOTH MANAGEMENT
===================================================== */

// Assign Booth (formerly addBooth logic)
export const assignBooth = async (req, res) => {
  try {
    const { boothId, exhibitorId } = req.body;
    const expo = await Expo.findById(req.params.id);

    if (!expo) return res.status(404).json({ success: false, error: 'Expo not found' });

    const booth = expo.booths.id(boothId);
    if (!booth) return res.status(404).json({ success: false, error: 'Booth not found' });

    booth.exhibitor = exhibitorId;
    await expo.save();

    res.json({ success: true, data: booth });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/* =====================================================
   EXHIBITOR APPLICATIONS (Moved from ExpoRegistration)
===================================================== */

// Get Exhibitor Applications
export const getExhibitorApplications = async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id)
      .populate('exhibitorApplications.exhibitor', 'name email company');

    if (!expo) return res.status(404).json({ success: false, error: 'Expo not found' });

    res.json({ success: true, data: expo.exhibitorApplications });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Approve / Reject Exhibitor
export const approveExhibitor = async (req, res) => {
  try {
    const { status } = req.body; // approved | rejected
    const expo = await Expo.findById(req.params.id);

    if (!expo) return res.status(404).json({ success: false, error: 'Expo not found' });

    const application = expo.exhibitorApplications.id(req.params.applicationId);
    if (!application)
      return res.status(404).json({ success: false, error: 'Application not found' });

    application.status = status;
    await expo.save();

    res.json({ success: true, data: application });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/* =====================================================
   SESSIONS
===================================================== */

// Create Session
export const createSession = async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id);
    if (!expo) return res.status(404).json({ success: false, error: 'Expo not found' });

    expo.sessions.push(req.body);
    await expo.save();

    res.status(201).json({ success: true, data: expo.sessions });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update Session
export const updateSession = async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id);
    if (!expo) return res.status(404).json({ success: false, error: 'Expo not found' });

    const session = expo.sessions.id(req.params.sessionId);
    if (!session) return res.status(404).json({ success: false, error: 'Session not found' });

    session.set(req.body);
    await expo.save();

    res.json({ success: true, data: session });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/* =====================================================
   ANALYTICS (Counts Only)
===================================================== */

export const getAnalytics = async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id);

    if (!expo) return res.status(404).json({ success: false, error: 'Expo not found' });

    const totalBooths = expo.booths.length;
    const filledBooths = expo.booths.filter(b => b.exhibitor).length;
    const approvedExhibitors =
      expo.exhibitorApplications.filter(a => a.status === 'approved').length;

    res.json({
      success: true,
      data: {
        totalBooths,
        filledBooths,
        approvedExhibitors
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
/* =====================================================
   EXPO REGISTRATIONS — ADMIN SIDE
===================================================== */

// Get all registrations for a specific expo
export const getRegistrationsByExpo = async (req, res) => {
  try {
    const { expoId } = req.params;

    const registrations = await ExpoRegistration.find({ expoId })
      .populate('exhibitorId', 'name email company')
      .populate('expoId', 'title date');

    res.json({ success: true, data: registrations });
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update registration status (approve/reject)
export const updateRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // approved | rejected

    const updated = await ExpoRegistration.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ success: false, error: 'Registration not found' });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
