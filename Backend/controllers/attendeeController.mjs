import Expo from '../models/expo.mjs';
import ExpoRegistration from '../models/expoRegistration.mjs';
import User from '../models/User.mjs';

/* =====================================================
   ATTENDEE CONTROLLER
===================================================== */

/* -------------------------
   GET EVENTS (All Expos)
------------------------- */
export const getEvents = async (req, res) => {
  try {
    const expos = await Expo.find()
      .populate('createdBy', 'name email')
      .populate('booths.exhibitor', 'name company');

    res.json({ success: true, data: expos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* -------------------------
   REGISTER FOR EVENT
------------------------- */
export const registerEvent = async (req, res) => {
  try {
    const { expoId, attendeeId } = req.body;

    if (!expoId || !attendeeId) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Check if already registered
    const existing = await ExpoRegistration.findOne({ expoId, attendeeId });
    if (existing) {
      return res.status(400).json({ success: false, error: 'Already registered' });
    }

    const registration = new ExpoRegistration({ expoId, attendeeId });
    await registration.save();

    res.status(201).json({ success: true, data: registration });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* -------------------------
   GET EXHIBITORS
------------------------- */
export const getExhibitors = async (req, res) => {
  try {
    const expoId = req.params.expoId;

    const expo = await Expo.findById(expoId).populate('booths.exhibitor', 'name email company');
    if (!expo) return res.status(404).json({ success: false, error: 'Expo not found' });

    const exhibitors = expo.booths
      .filter(b => b.exhibitor)
      .map(b => b.exhibitor);

    res.json({ success: true, data: exhibitors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* -------------------------
   SEARCH EXHIBITORS (by name or company)
------------------------- */
export const searchExhibitors = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) return res.status(400).json({ success: false, error: 'Query is required' });

    const exhibitors = await User.find({
      role: 'exhibitor',
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { company: { $regex: query, $options: 'i' } }
      ]
    }).select('name email company');

    res.json({ success: true, data: exhibitors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* -------------------------
   BOOKMARK SESSION
------------------------- */
export const bookmarkSession = async (req, res) => {
  try {
    const { expoId, sessionId, attendeeId } = req.body;

    if (!expoId || !sessionId || !attendeeId)
      return res.status(400).json({ success: false, error: 'Missing required fields' });

    const expo = await Expo.findById(expoId);
    if (!expo) return res.status(404).json({ success: false, error: 'Expo not found' });

    // Check if session exists
    const session = expo.sessions.id(sessionId);
    if (!session) return res.status(404).json({ success: false, error: 'Session not found' });

    // Create bookmarks array if not exists
    if (!session.bookmarks) session.bookmarks = [];

    if (session.bookmarks.includes(attendeeId))
      return res.status(400).json({ success: false, error: 'Already bookmarked' });

    session.bookmarks.push(attendeeId);
    await expo.save();

    res.json({ success: true, data: session });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
