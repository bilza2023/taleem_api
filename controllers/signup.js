require('dotenv').config();
const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');
const Student = require('../schemas/User');

async function signup(req, res) {
    try {
        const { email, password: passwordPlain } = req.body;

        // Input validation
        if (!email || !passwordPlain) {
            return res.status(400).json({ ok: false, message: "Email and password are required" });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ ok: false, message: "Invalid email format" });
        }

        // Password strength check
        if (passwordPlain.length < 8) {
            return res.status(400).json({ ok: false, message: "Password must be at least 8 characters long" });
        }

        const existingUser = await Student.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ ok: false, message: "This email already exists" });
        }

        const verificationId = uuid();
        const hashedPassword = await bcrypt.hash(passwordPlain, 12); // Increased salt rounds

        const newUser = await Student.create({
            email,
            password: hashedPassword,
            status: 'free',
            verificationId
        });

        if (newUser) {
            // await sendGmail(email, verificationId);
            return res.status(201).json({ ok: true, message: "Your account has been created" });
        } else {
            throw new Error("Failed to create user");
        }
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ ok: false, message: "Signup failed", error: error.message });
    }
}

module.exports = signup;