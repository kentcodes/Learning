const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // correct file path

const router = express.Router();

// Registration route
router.post("/register", async (req, res) => {
    const { username, password, role } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const newUser = new User({ username, password: hashedPassword, role: role || "user" });
        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({ message: "User registered successfully", token, user: { id: newUser._id, username: newUser.username, role: newUser.role } });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
