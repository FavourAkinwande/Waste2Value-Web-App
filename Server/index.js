const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const path = require('path');
require('dotenv').config(); // Import dotenv to use environment variables
const app = express();
const saltRounds = 10;

// Use environment variables for secrets
const JWT_SECRET = process.env.JWT_SECRET;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(SENDGRID_API_KEY);

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verificationToken: { type: String, required: false },
    isVerified: { type: Boolean, default: false }
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});

const UserModel = mongoose.model('User', UserSchema);

function generateVerificationToken() {
    return crypto.randomBytes(32).toString('hex');
}

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const verificationToken = generateVerificationToken();

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            console.log(`User with email ${email} already exists`);
            return res.status(400).json({ message: 'Email already in use' });
        }

        const newUser = new UserModel({
            username,
            email,
            password,
            verificationToken,
            isVerified: false
        });

        await newUser.save();

        const verificationUrl = `http://192.168.1.69:3001/verify/${verificationToken}`;
        const msg = {
            to: email,
            from: 'waste2value1234@gmail.com', // Replace with your verified sender
            subject: 'Please verify your email address',
            text: `Click here to verify your email address: ${verificationUrl}`,
            html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email address.</p>`
        };

        console.log(`Sending verification email to ${email} with URL: ${verificationUrl}`);
        await sgMail.send(msg);

        res.status(201).json({ message: 'Registration successful! Please check your email to verify your account.' });
    } catch (err) {
        console.error('Registration failed:', err);
        res.status(500).json({ message: 'Registration failed.', error: err.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            console.log(`User with email ${email} not found`);
            return res.status(400).json({ message: 'User not found' });
        }

        if (!user.isVerified) {
            console.log(`User with email ${email} has not verified email`);
            return res.status(400).json({ message: 'Please verify your email first' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log(`Invalid credentials for user with email ${email}`);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Login failed:', err);
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
});

app.get('/verify/:token', async (req, res) => {
    console.log(`Verification token received: ${req.params.token}`);

    try {
        const user = await UserModel.findOne({ verificationToken: req.params.token });

        if (!user) {
            console.log('User not found with the given token');
            return res.status(400).json({ message: 'Invalid verification token' });
        }

        console.log('User found, verifying email');
        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) {
        console.error('Email verification failed:', err);
        res.status(500).json({ message: 'Email verification failed', error: err.message });
    }
});

app.get('/test', (req, res) => {
    res.status(200).json({ message: 'Server is working!' });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
