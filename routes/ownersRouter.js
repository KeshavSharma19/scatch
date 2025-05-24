const express = require('express');
const router = express.Router();
const owner = require('../models/owners');

console.log(process.env.NODE_ENV, "sdsd");




if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        let owners = await owner.find()
        if (owners.length > 0) {
            return res.status(500).json({
                message: "Owner already exists"
            })
        }
        let createdOwner = await owner.create({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            // gstin: req.body.gstin
        })
        res.status(201).send(createdOwner)
    });
}


router.get('/admin', async (req, res) => {
    res.render('createProducts');
});


router.get('/', (req, res) => {
    res.send("Hello from owners");
});





module.exports = router;
