const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const product = require('../models/product');






router.post('/create', upload.single("image"), async (req, res) => {
    try {
        let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
         let createdProduct = await product.create({
        image: req.file.buffer,
        name ,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor
    })
    req.flash('success', 'Product created successfully');
    res.redirect('/owners/admin');
    } catch (error) {
        console.error('Error extracting product fields:', error);
        return res.status(400).send({ error: 'Invalid product data' });
    }
   
});


module.exports = router;
