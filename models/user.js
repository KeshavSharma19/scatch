const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        cart: {
            type: Array,
            default: [],
        },
        orders: {
            type: Array,
            default: [],
        },
        contact: Number,
        isAdmin: Boolean,
        Picture : String,
    }
)





module.exports = mongoose.model('user', userSchema)