const exp = require('express');
const adminApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const userAuthor = require('../models/userAuthorModel');

// API to get all admins
adminApp.get("/admins", expressAsyncHandler(async (req, res) => {
    const listOfAdmins = await userAuthor.find({ role: "admin" });
    res.status(200).send({ message: "Admins", payload: listOfAdmins });
}));

// Get all application consumers
adminApp.get('/allUsers', expressAsyncHandler(async (req, res) => {
    const listOfAllUsers = await userAuthor.find();
    res.status(200).send({ message: "AllUsers", payload: listOfAllUsers });
}));

// API to add a new admin
adminApp.post("/admin", expressAsyncHandler(async (req, res) => {
    const newAdmin = req.body;
    
    const adminInDb = await userAuthor.findOne({ email: newAdmin.email });

    if (adminInDb) {
        // Checking role
        if (newAdmin.role === adminInDb.role) {
            res.status(200).send({ message: newAdmin.role, payload: adminInDb });
        } else {
            res.status(400).send({ message: "Invalid role" });
        }
    } else {
        const newAdminDoc = new userAuthor(newAdmin);
        await newAdminDoc.save();
        res.status(201).send({ message: newAdmin.role, payload: newAdminDoc });
    }
}));

// API to block a user (PUT request)
adminApp.put('/block/:email', expressAsyncHandler(async (req, res) => {
    const { email } = req.params;
    const { isActive } = req.body;
    
    if (typeof isActive !== "boolean") {
        return res.status(400).send({ success: false, message: "Invalid isActive value. It should be a boolean." });
    }

    const user = await userAuthor.findOne({ email });

    if (user) {
        user.isActive = isActive;
        await user.save();  // Save the updated user document
        res.json({ success: true, message: 'User status updated successfully' });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
}));

// API to unblock a user (PUT request)
adminApp.put('/unblock/:email', expressAsyncHandler(async (req, res) => {
    const { email } = req.params;
    const { isActive } = req.body;
    if (typeof isActive !== "boolean") {
        return res.status(400).send({ success: false, message: "Invalid isActive value. It should be a boolean." });
    }
    const user = await userAuthor.findOne({ email });
    if (user) {
        user.isActive = isActive;
        await user.save();  
        res.json({ success: true, message: 'User status updated successfully' });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
}));

module.exports = adminApp;