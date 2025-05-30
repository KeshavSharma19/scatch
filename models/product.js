const mongoose = require('mongoose');



const productSchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        image: Buffer,
        discount: {
            type: Number,
            default: 0,
        },
        bgcolor : String,
        panelcolor : String,
        textcolor : String,
    }
)





module.exports = mongoose.model('product', productSchema)