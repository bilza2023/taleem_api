require('dotenv').config();
// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const auth = express.Router();

const db = require('../db.js'); // Require the database connection

// const Student = require("./student.js");
const sendGmail = require("./gmail.js");
// const send_Forget_Password_Gmail = require("./forget_password_gmail.js");
const { v4: uuid } = require('uuid');
////////////////////////////////////////////////////////

auth.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
debugger;
        // Check if user with the same email already exists
        db.get("SELECT * FROM students WHERE email = ?", [email], async (err, row) => {
            if (err) {
                console.error('Error checking existing user:', err.message);
                return res.status(500).json({ message: "Signup failed", error: err });
            }

            if (row) {
                return res.status(404).json({ message: "This Email already exists" });
            }

            // Generate verification ID
            const verificationId = uuid();

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new user into the database
            db.run("INSERT INTO students (email, password, verificationId) VALUES (?, ?, ?)", [email, hashedPassword, verificationId], async function (err) {
                if (err) {
                    console.error('Error creating user:', err.message);
                    return res.status(500).json({ message: "Signup failed", error: err });
                }

            //--even if the email fails the users gets response
            // Send email verification asynchronously
            sendGmail(email, verificationId);
              
                return res.status(200).json({ message: "Your account has been created" });
            });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ message: "Signup failed", error: error });
    }
});
auth.post("/login", async function (req, res) {
    try {
    // debugger;
        const email = req.body.email;
        const passwordPlain = req.body.password;

        if (!email || !passwordPlain) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Query the database for the user
        db.get("SELECT * FROM students WHERE email = ?", [email], async function(err, user) {
            if (err) {
                console.error("Error querying database:", err);
                return res.status(500).json({ message: "Login failed", error: err });
            }

            if (!user) {
                return res.status(404).json({ message: "Email address not found" });
            }
//==Allow the student to be logged in without verification
            // if (user.verified == 0) {
            //     return res.status(404).json({ message: "Your account is not verified", errorcode: "AccountNotVerified" });
            // }

            // Compare passwords
            const passwordMatch = await bcrypt.compare(passwordPlain, user.password);
            if (passwordMatch) {
                const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "30d" });
                res.set("Authorization", `Bearer ${token}`);
                return res.status(200).json({ message: "Login successful", token: token, email });
            } else {
                return res.status(401).json({ message: "Invalid email or password" });
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Login failed", error });
    }
});

auth.post("/forgot_password", async function (req, res) {
    try {
        const email = req.body.email;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        db.get("SELECT * FROM students WHERE email = ?", [email], async function(err, user) {
            if (err) {
                console.error("Error querying database:", err);
                return res.status(500).json({ message: "Failed to send link, please try later", error: err });
            }

            if (!user) {
                return res.status(404).json({ message: "This Email does not exist" });
            }

            const verificationId = uuid();
            const data = { verificationId };

            // Update verificationId for the user
            db.run("UPDATE students SET verificationId = ? WHERE email = ?", [verificationId, email], async function(err) {
                if (err) {
                    console.error("Error updating database:", err);
                    return res.status(500).json({ message: "Failed to send link, please try later", error: err });
                }
                // Send email logic goes here (not provided in the code snippet)
                // await send_Forget_Password_Gmail(email, verificationId);
                return res.status(200).json({ message: "A link has been sent to you" });
            });
        });

    } catch (error) {
        console.error("Failed to send link:", error);
        return res.status(500).json({ message: "Failed to send link, please try later", error });
    }
});
auth.post("/change_password", async function (req, res) {
    try {
    debugger;
        const email = req.body.email;
        const passwordPlain = req.body.password;

        if (!email || !passwordPlain) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        db.get("SELECT * FROM students WHERE email = ?", [email], async function(err, user) {
            if (err) {
                console.error("Error querying database:", err);
                return res.status(500).json({ message: "Password could not be changed, please try later", error: err });
            }

            if (!user) {
                return res.status(404).json({ message: "This Email is not found" });
            }

            const hashedPassword = await bcrypt.hash(passwordPlain, 2);
            const data = { password: hashedPassword };

            db.run("UPDATE students SET password = ? WHERE email = ?", [hashedPassword, email], async function(err) {
                if (err) {
                    console.error("Error updating database:", err);
                    return res.status(500).json({ message: "Password could not be changed, please try later", error: err });
                }
                return res.status(200).json({ message: "Password has been changed" });
            });
        });

    } catch (error) {
        console.error("Failed to change password:", error);
        return res.status(500).json({ message: "Password could not be changed, please try later", error });
    }
});

auth.post("/delete_user", async (req, res) => {
    try {
    debugger;
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Delete the user record from the database
        db.run("DELETE FROM students WHERE email = ?", [email], function(err) {
            if (err) {
                console.error('Error deleting user:', err.message);
                return res.status(500).json({ message: "Failed to delete user", error: err });
            }
            return res.status(200).json({ message: "User deleted successfully" });
        });
    } catch (error) {
        console.error('Failed to delete user:', error);
        return res.status(500).json({ message: "Failed to delete user", error: error });
    }
});


auth.post("/ispaid", async function (req, res) {
    try {
        const email = req.body.email;
        const tcode = req.body.tcode;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        db.get("SELECT * FROM students WHERE email = ?", [email], async function(err, user) {
            if (err) {
                console.error("Error querying database:", err);
                return res.status(500).json({ message: "Failed to verify", error: err });
            }

            if (!user) {
                return res.status(404).json({ message: "Failed to verify", allowed: false });
            }

            const today = new Date();
            const purchases = JSON.parse(user.purchases); // Assuming 'purchases' is stored as JSON in the database

            for (let i = 0; i < purchases.length; i++) {
                const element = purchases[i];
                if (element.tcode === tcode) {
                    if (new Date(element.endDate) > today) {
                        return res.status(200).json({ allowed: true });
                    } else {
                        return res.status(404).json({ allowed: false });
                    }
                }
            }
            return res.status(404).json({ message: "Failed to verify", allowed: false });
        });

    } catch (error) {
        console.error("Signup failed:", error);
        return res.status(500).json({ message: "Signup failed", error });
    }
});

auth.get("/verify", async function (req, res) {
    try {
        const id = req.query.id;
        const email = req.query.email;

        db.get("SELECT * FROM students WHERE email = ? AND verificationId = ?", [email, id], async function(err, user) {
            if (err) {
                console.error("Error querying database:", err);
                return res.status(500).json({ message: "Failed to verify", error: err });
            }

            if (!user) {
                return res.status(404).json({ message: "This link is not valid" });
            }

            user.verified = 1;
            user.verificationId = '';

            db.run("UPDATE students SET verified = 1, verificationId = '' WHERE email = ?", [email], async function(err) {
                if (err) {
                    console.error("Error updating database:", err);
                    return res.status(500).json({ message: "Failed to verify", error: err });
                }
                return res.status(200).json({ message: 'Success' });
            });
        });

    } catch (error) {
        console.error("Failed to verify:", error);
        return res.status(500).json({ message: "Failed to verify", error });
    }
});
////////////////////////////////////////////////////////


////////////////////////////////////////////////////////
module.exports = auth;
////////////////////////////////////////////////////////
