import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import bcrypt from 'bcryptjs'

export const register = async (req, res) => {
    try {
        console.log(req.body)
        const { fullname, email, phoneNumber, password, role } = req.body

        console.log(fullname, email, phoneNumber, password, role)

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: 'Something missing', success: false })
        }
        const user = await User.findOne({ email })
        if (user) {
            res.status(400).json({ message: 'User alreday exist with this email', success: false })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        })

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error.message)
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: 'Something is missing', success: false });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Incorrect email or password', success: false });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: 'Account does not exist with current role',
                success: false
            });
        }

        const tokenData = { userId: user._id }; // Changed from `user` to `userId`
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200)
            .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
            .json({
                message: `Welcome back ${user.fullname}`,
                user,
                success: true
            });
    } catch (error) {
        console.log(error);
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const updateProfile = async (req, res) => {
    try {
        // Log the request body for debugging


        const { id } = req.params;
        console.log(id)

        const { fullname, email, phoneNumber, bio, skills } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { fullname, email, phoneNumber, bio, skills },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


