import authService from '../services/UserAuth.js';
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// controllers/authController.js
const signup = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        if (!email || !name || !password) {
            return res.status(400).json({
                error: "Email, name, and password fields are required."
            });
        }
        const user = await authService.signup(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { signup };


export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const token = await authService.signin({ email, password });
        res.status(200).json({ message: 'Sign in successful', token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};



export default { signup, signin };