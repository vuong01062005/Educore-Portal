import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true, collection: 'accounts' }
);

export const Account =
  mongoose.models.Account || mongoose.model('Account', accountSchema);