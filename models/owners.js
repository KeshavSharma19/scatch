const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        picture : String,
        products: {
            type: Array,
            default: [],
        },
        gstin : String,
    }
)
module.exports = mongoose.model('owner', ownerSchema)