const router = require('express').Router();
const { Login, SignUp } = require('../controllers/auth');



router.post('/login', Login);
router.post('/signUp', SignUp);

module.exports = router;
