import { Request, Response } from 'express';
import User from './user.model';

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { firstName, lastName, email, password } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (password) user.password = password;

        await user.save();
        res.status(200).json({ message: 'User updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};
