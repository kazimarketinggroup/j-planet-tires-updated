/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt';
import { model, Model, Schema } from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';

interface UserModel extends Model<TUser> {
  isUserExistByEmail(...args: [string]): Promise<(TUser & { _id: unknown; isBlocked?: boolean }) | null>;
  isPasswordMatched(...args: [string, string]): Promise<boolean>;
}

const userSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds || 10));
  next();
});

userSchema.statics.isUserExistByEmail = function (email: string) {
  return this.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = (plainTextPassword: string, hashedPassword: string) =>
  bcrypt.compare(plainTextPassword, hashedPassword);

export const User = model<TUser, UserModel>('User', userSchema);
