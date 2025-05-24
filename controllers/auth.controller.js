
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.use(cookieParser());

const generateToken = require('../utils/generatetoken');





module.exports.registerUser = async (req, res) => {
    try {
        let { email, password, fullName } = req.body;
        if (!email || !password || !fullName) {
            console.log(email, password, fullName);
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        let existingUser = await userModel.find({ email });
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        password = hash;
        let createdUser = await userModel.create({
            email,
            fullName,
            password
        });
        let token = generateToken(createdUser);

        res.cookie('token', token);
        // res.status(201).json({ message: 'User registered successfully', user: createdUser, token: token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        let existingUser = await userModel.find({ email });
        if (existingUser.length === 0) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        const isMatch = await bcrypt.compare(password, existingUser[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        let token = generateToken(existingUser[0]);
        res.cookie('token', token);
        // res.status(200).json({ message: 'User logged in successfully', user: existingUser[0], token: token });
        res.redirect('/shop');
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}   


module.exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        res.redirect('/');
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}