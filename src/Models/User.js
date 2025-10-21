import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      match: /^[0-9]{7,15}$/,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    resetToken: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ['patient', 'medic', 'admin', 'employee'],
      default: 'patient',
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
