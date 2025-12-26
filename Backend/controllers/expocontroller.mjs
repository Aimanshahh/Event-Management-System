import Expo from '../models/expo.mjs';


// Get All Expos (public)
export const getExpos = async (req, res) => {
  try {
    const expos = await Expo.find().populate('createdBy', 'name email');
    res.json({ success: true, data: expos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Single Expo (public)
export const getExpoById = async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id)
      .populate('booths.exhibitor', 'name email company');
    if (!expo) return res.status(404).json({ success: false, error: 'Expo not found' });

    res.json({ success: true, data: expo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get My Expos (owner only)
export const getMyExpos = async (req, res) => {
  try {
    const expos = await Expo.find({ createdBy: req.user.id });
    res.json({ success: true, data: expos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create Expo (owner only)
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

// Update Expo (owner only)
export const updateExpo = async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id);
    if (!expo) return res.status(404).json({ success: false, error: 'Expo not found' });

    if (expo.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    const updatedExpo = await Expo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updatedExpo });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete Expo (owner only)
export const deleteExpo = async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id);
    if (!expo) return res.status(404).json({ success: false, error: 'Expo not found' });

    if (expo.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    await expo.deleteOne();
    res.json({ success: true, message: 'Expo deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* =====================================================
   BOOTH MANAGEMENT (Owner only)
===================================================== */

// Add Booth
export const addBooth = async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id);
    if (!expo) return res.status(404).json({ success: false, error: 'Expo not found' });

    if (expo.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    expo.booths.push(req.body);
    await expo.save();
    res.json({ success: true, data: expo });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update Booth
export const updateBooth = async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id);
    if (!expo) return res.status(404).json({ success: false, error: 'Expo not found' });

    if (expo.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    const booth = expo.booths.id(req.params.boothId);
    if (!booth) return res.status(404).json({ success: false, error: 'Booth not found' });

    booth.set(req.body);
    await expo.save();
    res.json({ success: true, data: expo });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete Booth
export const deleteBooth = async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id);
    if (!expo) return res.status(404).json({ success: false, error: 'Expo not found' });

    if (expo.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    expo.booths.id(req.params.boothId).deleteOne();
    await expo.save();
    res.json({ success: true, data: expo });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
