//user.model.ts
import mongoose, { Schema, Document } from "mongoose";
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

    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser> ({
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
    }
    }, {
        timestamps: true
    });


    userSchema.pre('save', async function(next) {
        const user = this as IUser;
        if (!user.isModified('password')) return next();

        try {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            next();
        } catch (error) {
            next(error as Error);
        }

        if (!user.verificationToken) {
            user.verificationToken = crypto.randomBytes(32).toString('hex');
        }
    });

    userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
        return await bcrypt.compare(candidatePassword, this.password);
    };

const User = mongoose.model<IUser>('User', userSchema);

export default User;