import User from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendOTPEmail } from '../utils/sendEmail.js';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET; // In production, use environment variable
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY ||'24h'; // Token expiry time

const createToken = (user) => {
    return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

// Register a new user
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if(!name || !email || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'Please provide all required fields' });
        }
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error registering user' });
    }

    if(!validator.isEmail(email)) {
        return res.status(400).json({ 
            success: false,
            message: 'Invalid email format' });
    }
    if(password.length < 8) {
        return res.status(400).json({ 
            success: false,
            message: 'Password must be at least 8 characters long' });
    }

    try {
        if(await User.findOne({ email })) {
            return res.status(400).json({ 
                success: false,
                message: 'Email already in use' });
        }

        const hashed = await bcrypt.hash(password,10);
        const user = await User.create({ name, email, password: hashed });
        const token = createToken(user._id);
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error registering user' });   
    }
}


// Login user

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ 
            success: false,
            message: 'Please provide email and password' });
    }

    try{
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid email or password' });
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid email or password' });    
        }

        const token = createToken(user._id);
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error logging in user' });    
    }
}

// to get login user details

export const getCurrentUser = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('name email');
        if(!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found' });   
        }
        res.status(200).json({
            success: true,
            user
        });
    }
    catch (error) {
        console.error('Error fetching current user:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error fetching current user' });    
    }
}

// to update user details

export const updateProfile = async (req, res) => {
    const { name, email } = req.body;
    if(!name || !email || !validator.isEmail(email)) {
        return res.status(400).json({ 
            success: false,
            message: 'Please provide valid name and email' });
    }

    try{
        const exists = await User.findOne({ email, _id: { $ne: req.user.id } });
        if(exists) {
            return res.status(409).json({ 
                success: false,
                message: 'Email already in use' });
        }
        const user = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true, runValidators: true }).select('name email');
        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user
        });
    }
    catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error updating profile' });    
    }
}


// to change password

export const updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if(!currentPassword || !newPassword || newPassword.length < 8) {
        return res.status(400).json({ 
            success: false,
            message: 'Please provide valid current and new password (min 8 characters)' }); 
    }

    try{
        const user = await User.findById(req.user.id).select('password');
        if(!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found' });   
        }

        const match = await bcrypt.compare(currentPassword, user.password);
        if(!match) {
            return res.status(400).json({ 
                success: false,
                message: 'Current password is incorrect' });    
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });
    }
    catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error updating password' });    
    }
}


// Step 1: request OTP
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address'
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            // Don't reveal whether the email exists
            return res.status(200).json({
                success: true,
                message: 'If that email is registered, an OTP has been sent'
            });
        }

        const otp = crypto.randomInt(100000, 999999).toString();
        user.resetOTP = otp;
        user.resetOTPExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        await sendOTPEmail(user.email, otp);

        res.status(200).json({
            success: true,
            message: 'If that email is registered, an OTP has been sent'
        });
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing request'
        });
    }
};

// Step 2: verify OTP
export const verifyResetOTP = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({
            success: false,
            message: 'Please provide email and OTP'
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || user.resetOTP !== otp || user.resetOTPExpiry < Date.now()) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired OTP'
            });
        }

        res.status(200).json({
            success: true,
            message: 'OTP verified successfully'
        });
    } catch (error) {
        console.error('Error in verifyResetOTP:', error);
        res.status(500).json({
            success: false,
            message: 'Error verifying OTP'
        });
    }
};

// Step 3: reset password
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword || newPassword.length < 8) {
        return res.status(400).json({
            success: false,
            message: 'Please provide valid email, OTP, and new password (min 8 characters)'
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || user.resetOTP !== otp || user.resetOTPExpiry < Date.now()) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired OTP'
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetOTP = null;
        user.resetOTPExpiry = null;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        res.status(500).json({
            success: false,
            message: 'Error resetting password'
        });
    }
};