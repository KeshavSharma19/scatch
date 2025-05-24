const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/auth.controller');




router.get('/', (req, res) => {
    res.send("Hello from users");
});
router.post('/register', registerUser);
router.post('/login', loginUser)
router.use('/logout' , logoutUser)



module.exports = router;
