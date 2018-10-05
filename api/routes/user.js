const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/checkauth');
const user = require('../controllers/user');

router.get("/all", user.get_all_users);

router.post('/signup', user.signup);

router.post("/login", user.login);

router.get("/:userId", checkAuth, user.get_single_user);

router.delete("/:userId", checkAuth, user.delete_user);

module.exports = router;