import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    expoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expo',
      required: true
    },

    title: {
      type: String,
      required: true
    },

    speaker: {
      type: String,
      required: true
    },

    timeSlot: {
      type: String, // e.g. "10:00 AM - 11:00 AM"
      required: true
    },

    location: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Session', sessionSchema);
