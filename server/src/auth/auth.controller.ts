//auth.controller.ts
import { Request, Response } from 'express';
import User, { IUser } from '../users/user.model'; 
import { sendVerificationEmail } from '../common/utils/sendEmail';

import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, firstName, lastName, email, password, role } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            res.status(400).json({ message: "User with this email or username already exists." });
            return;
        }

        const newUser = new User({ username, firstName, lastName, email, password, role });
        await newUser.save();
        await sendVerificationEmail(newUser);

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

export const logoutUser = (req: Request, res: Response) => {
    try {
        // Invalidate the JWT by removing it from the client-side storage (e.g., cookies or headers)
        res.clearCookie('token'); // If you're storing the token in cookies
        // Alternatively, you can handle other ways to invalidate the token (e.g., localStorage, sessionStorage)

        res.status(200).json({ message: 'User logged out successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};


export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            res.status(400).json({ message: 'Invalid email or password.' });
            return;
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { verificationToken } = req.params;
        const user = await User.findOne({ verificationToken });

        if (!user) {
            res.status(400).json({ message: 'Invalid verification token.' });
            return;
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};
