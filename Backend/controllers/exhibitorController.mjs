import Exhibitor from '../models/exhibitor.mjs';
import Expo from '../models/expo.mjs';
import Feedback from '../models/feedback.mjs';
import ExpoRegistration from '../models/expoRegistration.mjs';


// GET all exhibitors
export const getAllExhibitors = async (req, res) => {
  try {
    const exhibitors = await Exhibitor.find();
    res.json(exhibitors);
  } catch (error) {
    console.error('Exhibitors error:', error);
    res.status(500).json({ error: 'Failed to fetch exhibitors' });
  }
};

// GET single exhibitor
export const getExhibitorById = async (req, res) => {
  try {
    const { id } = req.params;

    const exhibitor = await Exhibitor.findById(id);
    if (!exhibitor) {
      return res.status(404).json({ error: 'Exhibitor not found' });
    }

    res.json(exhibitor);
  } catch (error) {
    console.error('Exhibitor error:', error);
    res.status(500).json({ error: 'Failed to fetch exhibitor' });
  }
};

// CREATE new exhibitor
export const createExhibitor = async (req, res) => {
  try {
    const {
      name,
      email,
      company,
      phone,
      category,
      status,
      boothNumber,
      expoId
    } = req.body;

    if (!name || !email || !company || !expoId) {
      return res
        .status(400)
        .json({ error: 'Name, email, company, and expoId are required' });
    }

    const newExhibitor = new Exhibitor({
      name,
      email,
      company,
      phone,
      category,
      status: status || 'pending',
      boothNumber,
      expoId
    });

    await newExhibitor.save();

    res.status(201).json(newExhibitor);
  } catch (error) {
    console.error('Create exhibitor error:', error);
    res.status(500).json({ error: 'Failed to create exhibitor' });
  }
};

// UPDATE exhibitor
export const updateExhibitor = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedExhibitor = await Exhibitor.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedExhibitor) {
      return res.status(404).json({ error: 'Exhibitor not found' });
    }

    res.json(updatedExhibitor);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Failed to update exhibitor' });
  }
};


// VIEW available booths (Exhibitor)
export const viewAvailableBooths = async (req, res) => {
  try {
    const { expoId } = req.params;

    const expo = await Expo.findById(expoId);
    if (!expo) {
      return res.status(404).json({ error: 'Expo not found' });
    }

    const availableBooths = expo.booths.filter(
      booth => booth.status === 'available'
    );

    res.json(availableBooths);
  } catch (error) {
    console.error('View booths error:', error);
    res.status(500).json({ error: 'Failed to fetch booths' });
  }
};


// RESERVE a booth (with concurrency check)
export const reserveBooth = async (req, res) => {
  try {
    const { expoId, boothId } = req.body;

    const expo = await Expo.findOneAndUpdate(
      { _id: expoId, "booths._id": boothId, "booths.status": "available" },
      { $set: { "booths.$.status": "reserved" } },
      { new: true }
    );

    if (!expo) {
      return res.status(400).json({ error: 'Booth not available or Expo/Booth not found' });
    }

    const reservedBooth = expo.booths.id(boothId);
    res.json({ message: 'Booth reserved successfully', booth: reservedBooth });
  } catch (error) {
    console.error('Reserve booth error:', error);
    res.status(500).json({ error: 'Failed to reserve booth' });
  }
};


// MESSAGE admin (Feedback)
export const messageAdmin = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const feedback = new Feedback({
      userId: req.user.id,
      message
    });

    await feedback.save();

    res.status(201).json({ message: 'Message sent to admin successfully' });
  } catch (error) {
    console.error('Message admin error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};
/* =====================================================
   EXPO REGISTRATION — EXHIBITOR SIDE
===================================================== */

// Exhibitor registers for an expo
export const registerForExpo = async (req, res) => {
  try {
    const {
      expoId,
      exhibitorId,
      companyDetails,
      productsServices,
      documents
    } = req.body;

    if (!expoId || !exhibitorId || !companyDetails || !productsServices) {
      return res.status(400).json({
        success: false,
        error: "Required fields missing"
      });
    }

    // Prevent duplicate registration
    const already = await ExpoRegistration.findOne({ expoId, exhibitorId });
    if (already)
      return res.status(400).json({
        success: false,
        error: "You have already applied for this expo"
      });

    const registration = await ExpoRegistration.create({
      expoId,
      exhibitorId,
      companyDetails,
      productsServices,
      documents,
      status: "pending"
    });

    res.status(201).json({ success: true, data: registration });
  } catch (error) {
    console.error("Expo registration error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
