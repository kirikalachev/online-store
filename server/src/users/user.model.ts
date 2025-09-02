//user.model.ts
// src/users/user.model.ts
import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import crypto from 'crypto';

export interface IUser extends Document {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  verificationToken?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;

  // NEW:
  favorites: Types.ObjectId[];

  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"]
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String
  },
  lastLogin: {
    type: Date
  },
  // NEW:
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    default: []
  }]
}, {
  timestamps: true
});

// (Незадължително, но полезно) Индекс за бързо търсене по favorites
userSchema.index({ _id: 1, favorites: 1 });

userSchema.pre('save', async function (next) {
  const user = this as IUser;

  // гарантираме, че verificationToken ще се зададе ако липсва
  if (!user.verificationToken) {
    user.verificationToken = crypto.randomBytes(32).toString('hex');
  }

  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    return next();
  } catch (error) {
    return next(error as Error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;