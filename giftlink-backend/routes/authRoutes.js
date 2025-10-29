const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../models/db');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

console.log('🔑 JWT_SECRET loaded:', JWT_SECRET ? 'Yes' : 'No');

// =============================
// REGISTER ENDPOINT
// =============================
router.post('/register', async (req, res) => {
    try {
        console.log('📨 Register request received');

        // Validation
        if (!req.body.firstName || !req.body.email || !req.body.password) {
            return res.status(400).json({ 
                error: "First name, email and password are required" 
            });
        }

        const db = await connectToDatabase();
        const collection = db.collection("users");

        // Vérifier email existant
        const existingEmail = await collection.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // Hasher le mot de passe
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);

        // Créer l'utilisateur
        const newUser = await collection.insertOne({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName || '',
            password: hash,
            createdAt: new Date(),
        });

        // Créer le token JWT
        const payload = { user: { id: newUser.insertedId } };
        const authtoken = jwt.sign(payload, JWT_SECRET);

        res.status(201).json({ 
            success: true,
            authtoken, 
            email: req.body.email 
        });

    } catch (e) {
        console.error('❌ REGISTRATION ERROR:', e.message);
        return res.status(500).json({ 
            error: 'Internal server error: ' + e.message 
        });
    }
});

// =============================
// LOGIN ENDPOINT
// =============================
router.post('/login', async (req, res) => {
    try {
        console.log('📨 Login request received:', req.body.email);

        // Validation
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ 
                error: "Email and password are required" 
            });
        }

        const db = await connectToDatabase();
        const collection = db.collection("users");

        // Trouver l'utilisateur
        const user = await collection.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcryptjs.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Wrong password' });
        }

        // Créer le token JWT
        const payload = { user: { id: user._id.toString() } };
        const authtoken = jwt.sign(payload, JWT_SECRET);

        res.json({ 
            success: true,
            authtoken, 
            user: {
                firstName: user.firstName,
                email: user.email
            }
        });

    } catch (e) {
        console.error('❌ LOGIN ERROR:', e.message);
        return res.status(500).json({ 
            error: 'Internal server error: ' + e.message 
        });
    }
});

// Route de test
router.get('/test', (req, res) => {
    res.json({ message: 'All auth routes working!' });
});

module.exports = router;
