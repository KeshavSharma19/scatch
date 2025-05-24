const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const product = require('../models/product');
const router = express.Router();
const userModel = require('../models/user');


router.get('/', (req, res) => {
    let err = req.flash('error');
    res.render('index', { err , loggedin : false });
}
);

router.get('/shop', isLoggedIn, async (req, res) => {
    let products =  await product.find();
    res.render('shop', { products });
})
router.get('/cart', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate('cart');
    let bill = user.cart.reduce((acc, item) => {
        return acc + item.price + 20 ;
    }, 0);
    res.render('cart' , {user , bill} );
})
router.get('/addtocart/:id', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.id);
    await user.save();
    res.redirect('/shop');

})

module.exports = router;