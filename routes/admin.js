const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/admin");
const auth = require("../middleware/auth");
const { helloAdmin } = require("../controllers/Admin");



router.get("/admin", auth, adminMiddleware, helloAdmin);





module.exports = router;
