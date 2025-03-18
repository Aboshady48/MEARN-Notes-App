import User from "../Model/UserScheme.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '3d',
    });
};

export const Login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide email and password",
        });
    }
    if(!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email",
        });
    }
    try {
        const userExists = await User.findOne({email})
        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: "Invaild Credantial",
                status: 404,
            });
        }
        const isMatch = await bcrypt.compare(password, userExists.password)
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
                status: 401,
            });
        }
        const token = generateToken(userExists._id);
        res.json({
            success: true,
            token,
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || "Server Error",
        });
        
    }
};

export const Register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide email and password",
        });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email",
        });
    }
    if (!validator.matches(password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
        return res.status(400).json({
            success: false,
            message: "Password must contain at least 8 characters, including uppercase letters, lowercase letters, numbers, and special characters",
        });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const savedUser = await new User({
            email,
            password: hashedPassword,
        }).save();

        // Generate token
        const token = generateToken(savedUser._id);

        // Send a single response
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            data: savedUser,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || "Server Error",
        });
    }
};
