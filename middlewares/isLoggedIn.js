const jwt = require('jsonwebtoken');
const userModel = require('../models/user');


module.exports = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        req.flash('error', 'Please login to access this resource');
        return res.redirect('/');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await userModel.findOne({
            email: decoded.email,
        }).select('-password');
        console.log(user);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    } catch (error) {
        req.flash('error', 'Please login to access this resource');
        return res.redirect('/');
    }
}