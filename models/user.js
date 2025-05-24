const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        cart: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref : 'product',
            }],
        orders: {
            type: Array,
            default: [],
        },
        contact: Number,
        Picture: String,
    }
)





module.exports = mongoose.model('user', userSchema)