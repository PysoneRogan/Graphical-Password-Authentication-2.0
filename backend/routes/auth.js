const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register new user
router.post('/signup', async (req, res) => {
    const { name, email, passwordSequence } = req.body;

    if (!name || !email || !passwordSequence || passwordSequence.length < 1) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ error: 'User already exists' });

        const newUser = new User({ name, email, passwordSequence });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, passwordSequence } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = JSON.stringify(user.passwordSequence) === JSON.stringify(passwordSequence);
        if (!isMatch) return res.status(401).json({ error: 'Invalid password sequence' });

        res.status(200).json({ message: 'Login successful!' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
