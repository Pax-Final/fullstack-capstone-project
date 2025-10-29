const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const connectToDatabase = require('../models/db');
const router = express.Router();
const dotenv = require('dotenv');
const pino = require('pino');

const logger = pino();
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// =============================
// REGISTER ENDPOINT
// =============================
router.post('/register', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("users");

        const existingEmail = await collection.findOne({ email: req.body.email });
        if (existingEmail) {
            logger.warn(`Attempted registration with existing email: ${req.body.email}`);
            return res.status(400).json({ error: "Email already registered" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);

        const newUser = await collection.insertOne({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
            createdAt: new Date(),
        });

        const payload = { user: { id: newUser.insertedId } };
        const authtoken = jwt.sign(payload, JWT_SECRET);

        logger.info(`User registered successfully: ${req.body.email}`);
        res.json({ authtoken, email: req.body.email });

    } catch (e) {
        logger.error(`Registration failed: ${e.message}`);
        return res.status(500).send('Internal server error');
    }
});

// =============================
// LOGIN ENDPOINT
// =============================
router.post('/login', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("users");

        const theUser = await collection.findOne({ email: req.body.email });
        if (!theUser) {
            logger.error(`Login failed: user not found for email ${req.body.email}`);
            return res.status(404).json({ error: 'User not found' });
        }

        const result = await bcryptjs.compare(req.body.password, theUser.password);
        if (!result) {
            logger.error(`Login failed: wrong password for email ${req.body.email}`);
            return res.status(401).json({ error: 'Wrong password' });
        }

        const payload = { user: { id: theUser._id.toString() } };
        const authtoken = jwt.sign(payload, JWT_SECRET);

        logger.info(`User logged in successfully: ${theUser.email}`);
        res.json({ authtoken, userName: theUser.firstName, userEmail: theUser.email });

    } catch (e) {
        logger.error(`Login failed: ${e.message}`);
        return res.status(500).send('Internal server error');
    }
});

// =============================
// UPDATE PROFILE ENDPOINT
// =============================
router.put('/update', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('Validation errors in update request', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const email = req.headers.email;
        if (!email) {
            logger.error('Email not found in request headers');
            return res.status(400).json({ error: "Email header missing" });
        }

        const db = await connectToDatabase();
        const collection = db.collection("users");

        const existingUser = await collection.findOne({ email });
        if (!existingUser) {
            logger.error('User not found');
            return res.status(404).json({ error: "User not found" });
        }

        
        existingUser.firstName = req.body.firstName || existingUser.firstName;
        existingUser.lastName = req.body.lastName || existingUser.lastName;
        existingUser.updatedAt = new Date();

        const updatedUser = await collection.findOneAndUpdate(
            { email },
            { $set: existingUser },
            { returnDocument: 'after' }
        );

        const payload = { user: { id: updatedUser._id.toString() } };
        const authtoken = jwt.sign(payload, JWT_SECRET);

        logger.info(`User updated successfully: ${email}`);
        res.json({ authtoken });

    } catch (error) {
        logger.error(`Update failed: ${error.message}`);
        return res.status(500).send("Internal server error");
    }
});

module.exports = router;
